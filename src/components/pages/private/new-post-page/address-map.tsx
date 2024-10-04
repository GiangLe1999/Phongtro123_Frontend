import { FC, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

interface Props {
  location: {
    province: string;
    district: string;
    ward: string;
    street: string;
    address_number: string;
  };
}

const AdddressMap: FC<Props> = ({ location }): JSX.Element => {
  const mapContainerRef = useRef<HTMLDivElement>(null); // Reference to map container
  const [map, setMap] = useState<mapboxgl.Map | null>(null); // Mapbox instance
  const markerRef = useRef<mapboxgl.Marker | null>(null); // Marker reference

  useEffect(() => {
    if (mapContainerRef.current && !map) {
      const mapInstance = new mapboxgl.Map({
        container: mapContainerRef.current, // Reference to the map container div
        style: "mapbox://styles/mapbox/streets-v11", // Map style
        center: [106.7, 10.8], // Default center (Ho Chi Minh City)
        zoom: 9, // Default zoom level
      });

      // Initialize a new marker but don't place it on the map yet
      markerRef.current = new mapboxgl.Marker();

      setMap(mapInstance); // Set map instance in state

      // Clean up map instance on component unmount
      return () => {
        mapInstance.remove();
      };
    }
  }, []); // Run this effect only once after the component mounts

  // Function to send geocoding request and update map position
  const updateMapByLocation = async (locationString: string) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      locationString
    )}.json?access_token=${mapboxgl.accessToken}&limit=1`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const coordinates = data.features[0].geometry.coordinates;

        if (map) {
          // Move map to the new location
          map.flyTo({
            center: coordinates,
            zoom: 12,
          });

          // Update marker position or create it if it's not already on the map
          if (markerRef.current) {
            markerRef.current.setLngLat(coordinates).addTo(map);
          } else {
            // Create a new marker if it doesn't exist yet (this is unlikely since it's initialized in useEffect)
            markerRef.current = new mapboxgl.Marker()
              .setLngLat(coordinates)
              .addTo(map);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
    }
  };

  // Handle province/district/ward/street changes and update the map
  useEffect(() => {
    const { province, district, ward, street, address_number } = location;

    // Construct a search string from the user's input
    const locationString =
      `${address_number} ${street}, ${ward}, ${district}, ${province}`.trim();

    if (locationString) {
      updateMapByLocation(locationString);
    }
  }, [location]);

  return (
    <div
      className="rounded-sm shadow-sm"
      ref={mapContainerRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default AdddressMap;

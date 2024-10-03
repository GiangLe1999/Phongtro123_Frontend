"use client";

import { FC, use, useEffect, useRef, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import AdddressMap from "./address-map";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FormSchema = z.object({
  address_number: z
    .string({
      required_error: "Số nhà là bắt buộc.",
    })
    .min(1, "Số nhà không được để trống."),

  province: z
    .string({
      required_error: "Tỉnh/Thành phố là bắt buộc.",
    })
    .min(1, "Tỉnh/Thành phố không được để trống."),

  district: z
    .string({
      required_error: "Quận/huyện là bắt buộc.",
    })
    .min(1, "Quận/huyện không được để trống."),

  ward: z
    .string({
      required_error: "Phường/xã là bắt buộc.",
    })
    .min(1, "Phường/xã không được để trống."),

  street: z
    .string({
      required_error: "Tên đường là bắt buộc.",
    })
    .min(1, "Tên đường không được để trống."),
});

interface Props {
  provinces: { id: string; name: string }[];
}

const NewPostForm: FC<Props> = ({ provinces }): JSX.Element => {
  // Districts States
  const [districts, setDistricts] = useState<{ id: string; name: string }[]>(
    []
  );
  const [getDistrictsLoading, setGetDistrictsLoading] = useState(false);

  // Wards States
  const [wards, setWards] = useState<{ id: string; name: string }[]>([]);
  const [getWardsLoading, setGetWardsLoading] = useState(false);

  // Streets States
  const [streets, setStreets] = useState<string[]>([]);
  const [getStreetsLoading, setGetStreetsLoading] = useState(false);

  // Form States
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      address_number: "",
      province: "",
      district: "",
      ward: "",
      street: "",
    },
    mode: "onChange",
  });

  // Derived States
  const errors = form.formState.errors;
  const choseProvince = form.watch("province");
  const initialChoseProvince = provinces.find((p) => p.id === choseProvince);

  const choseDistrict = form.watch("district");
  const initialChoseDistrict = districts.find((d) => d.id === choseDistrict);

  const choseWard = form.watch("ward");
  const initialChoseWard = wards.find((w) => w.id === choseWard);

  const choseStreet = form.watch("street");
  const choseAddressNumber = form.watch("address_number");

  const fullAddress = `${
    choseAddressNumber ? `Số ${choseAddressNumber}, ` : ""
  } ${choseStreet ? `${choseStreet}, ` : ""}${
    choseWard ? `${initialChoseWard?.name}, ` : ""
  }${choseDistrict ? `${initialChoseDistrict?.name}, ` : ""}${
    choseProvince ? `${initialChoseProvince?.name}` : ""
  }`;

  // Submit Form
  function onSubmit(data: z.infer<typeof FormSchema>) {}

  // Get Districts & Set Districts
  const getDistricts = async () => {
    setGetDistrictsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_LOCATION_LIST_BASE_API}/2/${choseProvince}.htm`
      );

      if (!res.ok) {
        console.log("Lấy dữ liệu quận/huyện không thành công.");
      }

      const { data } = await res.json();
      setDistricts(data);
      setGetDistrictsLoading(false);
    } catch (error) {
      console.log("Lấy dữ liệu quận/huyện không thành công.");
      setGetDistrictsLoading(false);
    }
  };
  useEffect(() => {
    getDistricts();
  }, [choseProvince]);

  // Get Wards & Set Wards
  const getWards = async () => {
    setGetWardsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_LOCATION_LIST_BASE_API}/3/${choseDistrict}.htm`
      );

      if (!res.ok) {
        console.log("Lấy dữ liệu phường/xã không thành công.");
      }

      const { data } = await res.json();
      setWards(data);
      setGetWardsLoading(false);
    } catch (error) {
      console.log("Lấy dữ liệu phường/xã không thành công.");
      setGetWardsLoading(false);
    }
  };
  useEffect(() => {
    getWards();
  }, [choseDistrict]);

  // Get Streets & Set Streets
  const getStreets = async () => {
    setGetStreetsLoading(true);
    const getBoudingBoxUrl = `${
      process.env.NEXT_PUBLIC_GET_BOUNDING_BOX_BASE_API
    }${initialChoseWard?.name.replace(
      / /g,
      "+"
    )},${initialChoseProvince?.name.replace(
      / /g,
      "+"
    )}&class=boundary&type=administrative`;

    try {
      const boundingBoxRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/boundary-box`,
        {
          method: "POST",
          body: JSON.stringify(getBoudingBoxUrl),
        }
      );

      if (!boundingBoxRes.ok) {
        console.log("Lấy bouding box của phường/xã không thành công.");
      }

      const boundingBoxData = await boundingBoxRes.json();

      if (boundingBoxData.status === 404) {
        console.log("Không tìm thấy bounding box");
        setGetStreetsLoading(false);
        setStreets([]);
      } else {
        try {
          const overpassUrl = process.env
            .NEXT_PUBLIC_GET_STREET_LIST_BASE_API as string;
          const query = `
        [out:json];
        (
          way["highway"](${boundingBoxData[0]},${boundingBoxData[2]},${boundingBoxData[1]},${boundingBoxData[3]});
        );
        out body;
        >;
        out skel qt;`;

          // Fetch data from Overpass API
          const response = await fetch(overpassUrl, {
            method: "POST",
            body: query,
          });

          const json = await response.json();

          if (!response.ok) {
            console.error("Error fetching data:", json.error);
          }

          const filteredStreets = [
            ...new Set(
              json.elements
                .filter((e: any) => e.tags?.name !== undefined)
                .map((e: any) => e.tags.name.trim())
            ),
          ];

          setStreets(filteredStreets as string[]);
          console.log(filteredStreets);
          setGetStreetsLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    } catch (error) {
      console.log("Lấy bounding box của phường/xã không thành công.");
      setStreets([]);
      setGetWardsLoading(false);
    }
  };
  useEffect(() => {
    getStreets();
  }, [choseWard]);

  return (
    <div className="flex gap-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-[60%]"
        >
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tỉnh/Thành phố</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="--Chọn Tỉnh/Thành phố--" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {provinces.map((province) => (
                        <SelectItem value={province.id} key={province.id}>
                          {province.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.province ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>
                      Vui lòng chọn Tỉnh/Thành phố
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quận/Huyện</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={getDistrictsLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="--Chọn Quận/Huyện--" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {districts.map((district) => (
                        <SelectItem value={district.id} key={district.id}>
                          {district.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.district ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>Vui lòng chọn Quận/Huyện</FormDescription>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ward"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phường/Xã</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={getWardsLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="--Chọn Phường/Xã--" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {wards.map((ward) => (
                        <SelectItem value={ward.id} key={ward.id}>
                          {ward.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.ward ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>Vui lòng chọn Phường/Xã</FormDescription>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Đường/Phố</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={getWardsLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="--Chọn Đường/Phố--" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {streets.map((street: string) => (
                        <SelectItem value={street} key={street}>
                          {street}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.ward ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>Vui lòng chọn Đường/Phố</FormDescription>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số nhà</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập số nhà" {...field} />
                  </FormControl>
                  {errors.address_number ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>Vui lòng nhập số nhà</FormDescription>
                  )}
                </FormItem>
              )}
            />
          </div>

          <FormItem>
            <FormLabel>Địa chỉ chính xác</FormLabel>
            <Input
              type="address"
              id="full_address"
              placeholder="Địa chỉ chính xác"
              disabled
              value={fullAddress}
            />
          </FormItem>

          <Button type="submit">Submit</Button>
        </form>
      </Form>

      <div className="flex-1 ">
        <div className="w-full aspect-square">
          {/* <AdddressMap
            location={{
              address_number: choseAddressNumber,
              street: choseStreet,
              province: initialChoseProvince?.name || "",
              district: initialChoseDistrict?.name || "",
              ward: initialChoseWard?.name || "",
            }}
          /> */}
        </div>

        <div className="bg-[#FFF9E6] rounded-sm p-4 mt-6 mb-5 shadow-md text-sm">
          <h2 className="font-bold text-xl mb-2">Lưu ý khi đăng tin:</h2>
          <ul className="text-sm list-disc space-y-2 list-inside marker:text-muted-foreground">
            <li>Nội dung phải viết bằng tiếng Việt có dấu.</li>
            <li>
              Tiêu đề tin không dài quá 100 kí tự Các bạn nên điền đầy đủ thông
              tin vào các mục để tin đăng có hiệu quả hơn.
            </li>
            <li>
              Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn, hãy
              sửa vị trí tin rao của bạn trên bản đồ bằng cách kéo icon tới đúng
              vị trí của tin rao.
            </li>
            <li>
              Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều lần so
              với tin rao không có ảnh.
            </li>
            <li>Hãy đăng ảnh để được giao dịch nhanh chóng!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewPostForm;

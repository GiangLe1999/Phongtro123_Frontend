import React, { FC, useEffect } from "react";

interface Props {
  count: number; // count is in seconds
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const CountdownTimer: FC<Props> = ({ count, setCount }) => {
  useEffect(() => {
    if (count > 0) {
      const timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [count, setCount]);

  // Function to format seconds into MM:SS
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return <p>({formatTime(count)})</p>;
};

export default CountdownTimer;

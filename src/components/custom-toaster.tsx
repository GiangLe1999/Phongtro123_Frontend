import { Toaster } from "@/components/ui/sonner";
import {
  CircleAlertIcon,
  CircleCheckBigIcon,
  CircleXIcon,
  InfoIcon,
} from "lucide-react";
import { FC } from "react";

interface Props {}

const CustomToaster: FC<Props> = (props): JSX.Element => {
  return (
    <Toaster
      toastOptions={{
        classNames: {
          error: "bg-red-500 text-white border border-white",
          success: "bg-green-600 text-white border border-white",
          warning: "bg-yellow-600 text-white border border-white",
          info: "bg-blue-600 text-white border border-white",
          actionButton: "font-semibold",
          description: "!text-[10px]",
        },
      }}
      icons={{
        success: <CircleCheckBigIcon size={18} />,
        info: <InfoIcon size={18} />,
        warning: <CircleAlertIcon size={18} />,
        error: <CircleXIcon size={18} />,
      }}
    />
  );
};

export default CustomToaster;

import { Button } from "@/components/ui/button";
import { pageLinks } from "@/src/constants";
import {
  Calculator,
  Calendar,
  Clock4,
  DollarSign,
  FilePenLine,
  LogOut,
  MessageCircle,
  UserCog,
} from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import { FC } from "react";

const menuOptions = [
  {
    title: "Quản lý tin đăng",
    link: pageLinks.manage_posts,
    icon: FilePenLine,
  },
  {
    title: "Sửa thông tin cá nhân",
    link: pageLinks.user_profile,
    icon: UserCog,
  },
  {
    title: "Nạp tiền vào tài khoản",
    link: pageLinks.payment,
    icon: DollarSign,
  },
  {
    title: "Lịch sử nạp tiền",
    link: pageLinks.payment_history,
    icon: Clock4,
  },
  {
    title: "Lịch sử thanh toán",
    link: pageLinks.checkout_history,
    icon: Calendar,
  },
  {
    title: "Bảng giá dịch vụ",
    link: pageLinks.pricing,
    icon: Calculator,
  },
  {
    title: "Liên hệ",
    link: pageLinks.contact,
    icon: MessageCircle,
  },
  {
    title: "Thoát",
    link: pageLinks.contact,
    icon: LogOut,
  },
];

interface Props {
  session: Session | null;
}

const PrivateSidebarContent: FC<Props> = ({ session }): JSX.Element => {
  return (
    <nav className="w-[250px] fixed z-[1] block overflow-x-hidden overflow-y-auto bg-white p-5 border-r-[#e6e6e6] border-b-[#e6e6e6] border-r border-solid border-b left-0 top-[45px] bottom-0">
      <div className="flex items-center gap-4">
        <div className="relative w-[50px] aspect-square border rounded-md">
          <Image
            src="/images/default-user.webp"
            alt="avatar"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            className="rounded-md"
          />
        </div>

        <div className="-mt-1">
          <p className="font-bold text-lg line-clamp-1">{session?.user.name}</p>
          <p className="text-sm">{session?.user.tel}</p>
        </div>
      </div>

      <div className="w-full h-[1px] border-t mt-6 mb-4"></div>

      <ul className="text-sm space-y-2">
        <li>
          <span className="font-bold">Mã thành viên:</span>
          <span> #{session?.user.id}</span>
        </li>
        <li>
          <span className="font-bold">Vai trò:</span>
          <span> Chính chủ</span>
        </li>
      </ul>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <Button className="h-8 px-2 text-xs rounded-sm bg-[#E0A800] text-white hover:bg-[#E0A800]">
          Nạp tiền
        </Button>
        <Button className="h-8 px-2 text-xs rounded-sm bg-[#C82333] text-white hover:bg-[#C82333]">
          Đăng tin
        </Button>
      </div>

      <div className="bg-[#FFF9E6] rounded-sm p-4 mt-6 shadow-md">
        <p className="text-xs">Nhân viên hỗ trợ riêng của bạn:</p>

        <p className="font-bold text-sm mt-1">
          Thanh Giang - LBKCorp 0962334807
        </p>
      </div>
    </nav>
  );
};

export default PrivateSidebarContent;

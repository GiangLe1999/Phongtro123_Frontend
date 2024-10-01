"use client";

import { Button } from "@/components/ui/button";
import { pageLinks } from "@/src/constants";
import { cn } from "@/src/lib/utils";
import {
  Calculator,
  Calendar,
  ClipboardPlus,
  Clock4,
  DollarSign,
  FilePenLine,
  LogOut,
  MessageCircle,
  UserCog,
} from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

const menuOptions = [
  {
    title: "Quản lý tin đăng",
    link: pageLinks.manage_posts,
    icon: FilePenLine,
  },
  {
    title: "Đăng tin mới",
    link: pageLinks.post,
    icon: ClipboardPlus,
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
    function: signOut,
    icon: LogOut,
  },
];

interface Props {
  session: Session | null;
}

const PrivateSidebarContent: FC<Props> = ({ session }): JSX.Element => {
  const pathname = usePathname();

  return (
    <nav className="w-[250px] fixed z-[1] block overflow-x-hidden overflow-y-auto bg-white py-5 border-r-[#e6e6e6] border-b-[#e6e6e6] border-r border-solid border-b left-0 top-[45px] bottom-0">
      <div className="flex items-center gap-4 px-5">
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

      <div className="w-full h-[1px] border-t mt-6 mb-4 px-5"></div>

      <ul className="text-sm space-y-2 px-5">
        <li>
          <span className="font-bold">Mã thành viên:</span>
          <span> #{session?.user.id}</span>
        </li>
        <li>
          <span className="font-bold">Vai trò:</span>
          <span> Chính chủ</span>
        </li>
      </ul>

      <div className="grid grid-cols-2 gap-4 mt-4 px-5">
        <Button className="h-8 px-2 text-xs rounded-sm bg-[#E0A800] text-white hover:bg-[#E0A800]">
          Nạp tiền
        </Button>
        <Button className="h-8 px-2 text-xs rounded-sm bg-[#C82333] text-white hover:bg-[#C82333]">
          Đăng tin
        </Button>
      </div>

      <div className="bg-[#FFF9E6] rounded-sm p-4 mt-6 shadow-md mx-5">
        <p className="text-xs">Nhân viên hỗ trợ riêng của bạn:</p>

        <p className="font-bold text-sm mt-1">
          Thanh Giang - LBKCorp 0962334807
        </p>
      </div>

      <ul className="mt-6 px-2">
        {menuOptions.map((item) => {
          const isActive = pathname === item.link;

          if (item.function)
            return (
              <li key="Sign out">
                <button
                  className="flex items-center gap-2 text-sm font-medium py-2 hover:bg-[#f1f1f1] rounded-sm w-full transition px-3"
                  onClick={() =>
                    item.function({
                      callbackUrl: pageLinks.home,
                      redirect: true,
                    })
                  }
                >
                  <item.icon className="w-4 h-4 text-gray-700" />
                  {item.title}
                </button>
              </li>
            );

          return (
            <li key={item.title}>
              <Link
                href={item.link}
                className={cn(
                  "flex items-center gap-2 text-sm mb-1 py-2 rounded-sm w-full transition px-3",
                  isActive
                    ? "bg-[#f1f1f1] font-bold text-primary"
                    : "hover:bg-[#f1f1f1] font-medium"
                )}
              >
                <item.icon
                  className={cn(
                    isActive ? "text-primary" : "text-gray-700",
                    "w-4 h-4"
                  )}
                />
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default PrivateSidebarContent;

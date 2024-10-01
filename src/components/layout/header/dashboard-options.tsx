import { FC } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { pageLinks } from "@/src/constants";
import { signOut } from "next-auth/react";

interface Props {
  title: string;
  icon: any;
}

const DashboardOptions: FC<Props> = ({ title, icon }): JSX.Element => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={
            "hover:underline hover:text-secondary flex items-center gap-1 px-3 h-full transition"
          }
        >
          {icon}
          <span>{title}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 px-4">
        <DropdownMenuItem className="border-b hover:!bg-gray-50 py-3">
          <Link
            href={pageLinks.post}
            className="flex items-center hover:text-primary font-semibold w-full"
          >
            <Image
              src="/icons/dashboard-add-post.svg"
              width={16}
              height={16}
              alt="Đăng tin cho thuê"
              className="mr-2"
            />
            <span>Đăng tin cho thuê</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="border-b hover:!bg-gray-50 py-3">
          <Link
            href={pageLinks.manage_posts}
            className="flex items-center hover:text-primary font-semibold w-full"
          >
            <Image
              src="/icons/dashboard-manage-post.svg"
              width={16}
              height={16}
              alt="Quản lý tin đăng"
              className="mr-2"
            />
            <span>Quản lý tin đăng</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="border-b hover:!bg-gray-50 py-3">
          <Link
            href={pageLinks.payment}
            className="flex items-center hover:text-primary font-semibold w-full"
          >
            <Image
              src="/icons/dashboard-payment.svg"
              width={16}
              height={16}
              alt="Nạp tiền"
              className="mr-2"
            />
            <span>Nạp tiền</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="border-b hover:!bg-gray-50 py-3">
          <Link
            href={pageLinks.payment_history}
            className="flex items-center hover:text-primary font-semibold w-full"
          >
            <Image
              src="/icons/dashboard-payment-history.svg"
              width={16}
              height={16}
              alt="Lịch sử nạp tiền"
              className="mr-2"
            />
            <span>Lịch sử nạp tiền</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="border-b hover:!bg-gray-50 py-3">
          <Link
            href={pageLinks.user_profile}
            className="flex items-center hover:text-primary font-semibold w-full"
          >
            <Image
              src="/icons/dashboard-user.svg"
              width={16}
              height={16}
              alt="Thông tin cá nhân"
              className="mr-2"
            />
            <span>Thông tin cá nhân</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="border-b hover:!bg-gray-50 py-3">
          <Link
            href={pageLinks.bookmarks}
            className="flex items-center hover:text-primary font-semibold w-full"
          >
            <Image
              src="/icons/dashboard-post-saved.svg"
              width={16}
              height={16}
              alt="Tin đã lưu"
              className="mr-2"
            />
            <span>Tin đã lưu</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="hover:!bg-gray-50 py-3">
          <button
            onClick={() => signOut()}
            className="flex items-center hover:text-primary font-semibold w-full"
          >
            <Image
              src="/icons/dashboard-logout.svg"
              width={16}
              height={16}
              alt="Thoát"
              className="mr-2"
            />
            <span>Thoát</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardOptions;

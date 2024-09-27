import { FC } from "react";

import {
  HeartIcon,
  LayoutDashboardIcon,
  LogInIcon,
  UserRoundPlusIcon,
} from "lucide-react";
import { pageLinks } from "@/src/constants";
import authOptions from "@/src/lib/configs/auth/authOptions";
import { getServerSession } from "next-auth";
import HeaderContent from "./header-content";

const defaultTopRightItems = [
  {
    title: "Yêu thích",
    icon: <HeartIcon size={16} />,
    link: pageLinks.bookmarks,
  },
  {
    title: "Đăng nhập",
    icon: <LogInIcon size={16} />,
    link: pageLinks.login,
  },
  {
    title: "Đăng ký",
    icon: <UserRoundPlusIcon size={16} />,
    link: pageLinks.register,
  },
];

const loggedInTopRightItems = [
  {
    title: "Yêu thích",
    icon: <HeartIcon size={16} />,
    link: pageLinks.bookmarks,
  },
  {
    title: "Quản lý tài khoản",
    icon: <LayoutDashboardIcon size={16} />,
    link: "",
  },
];

const navItems = [
  { title: "Trang chủ", link: pageLinks.home },
  { title: "Cho thuê phòng trọ", link: pageLinks.room_postings },
  { title: "Nhà cho thuê", link: pageLinks.home_postings },
  { title: "Cho thuê căn hộ", link: pageLinks.apartment_postings },
  { title: "Mặt bằng", link: pageLinks.ground_postings },
  { title: "Tìm người ở ghép", link: pageLinks.search_partners },
  { title: "Tin tức", link: pageLinks.news },
  { title: "Bảng giá dịch vụ", link: pageLinks.pricing },
];

interface Props {}

const Header: FC<Props> = async (props): Promise<JSX.Element> => {
  const session = await getServerSession(authOptions);
  const topRightItems =
    session && session.user ? loggedInTopRightItems : defaultTopRightItems;

  return (
    <div>
      <HeaderContent topRightItems={topRightItems} navItems={navItems} />
    </div>
  );
};

export default Header;

import { FC } from "react";
import Link from "next/link";
import { pageLinks } from "@/src/constants";

interface Props {}

const dashboardOptions = [
  {
    title: "Trang chủ",
    link: pageLinks.home,
  },
  {
    title: "Phòng trọ",
    link: pageLinks.room_postings,
  },
  {
    title: "Nhà cho thuê",
    link: pageLinks.home_postings,
  },
  {
    title: "Căn hộ",
    link: pageLinks.apartment_postings,
  },
  {
    title: "Mặt bằng",
    link: pageLinks.ground_postings,
  },
  {
    title: "Ở ghép",
    link: pageLinks.search_partners,
  },
];

const PrivateHeader: FC<Props> = (props): JSX.Element => {
  return (
    <nav className="bg-[#055699] h-[45px] shadow-[0px_2px_5px_0_rgba(0,0,0,0.2)] fixed z-[1030] top-0 inset-x-0 text-white">
      <div className="flex items-center gap-1 px-5">
        <div className="w-[250px] text-[17px] font-bold">
          <Link className="w-full py-[9px] block" href={pageLinks.home}>
            Phongtro123.com
          </Link>
        </div>
        <div className="flex-1">
          <ul className="flex items-center gap-1">
            {dashboardOptions.map((item) => (
              <li key={item.title}>
                <Link
                  className="text-sm hover:text-[#ffc46c] transition block py-[9px] px-4 font-medium"
                  href={item.link}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default PrivateHeader;

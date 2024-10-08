"use client";

import { FC } from "react";
import SectionContainer from "../../section-container";
import Image from "next/image";
import logo from "@/public/logo-phongtro-123.svg";
import Link from "next/link";
import { PlusCircleIcon } from "lucide-react";
import { pageLinks } from "@/src/constants";
import { Button } from "../../ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/src/lib/utils";
import DashboardOptions from "./dashboard-options";

interface Props {
  topRightItems: {
    title: string;
    icon: any;
    link: string;
  }[];
  navItems: { title: string; link: string }[];
}

const HeaderContent: FC<Props> = ({ topRightItems, navItems }): JSX.Element => {
  const pathname = usePathname();

  return (
    <header className="bg-background" style={{ display: "unset" }}>
      <SectionContainer className="flex items-center justify-between h-[70px]">
        <Link href="/" className="w-60 h-full flex items-center">
          <Image
            src={logo}
            alt="Logo Phong Tro 123"
            className="w-full h-[44px]"
          />
        </Link>

        <div className="flex items-center gap-[5px] text-sm font-semibold h-full">
          {topRightItems?.map((item) => {
            if (!item.link) {
              return (
                <DashboardOptions
                  key="Dashboard options"
                  title={item.title}
                  icon={item.icon}
                />
              );
            }

            return (
              <Link
                key={item.title}
                href={item.link}
                className={cn(
                  pathname === item.link
                    ? "text-secondary underline font-bold"
                    : "hover:underline hover:text-secondary",
                  "flex items-center gap-1 px-3 h-full transition"
                )}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            );
          })}

          <Button
            variant="secondary"
            className="rounded-md ml-2 font-semibold gap-1 hover:underline"
          >
            <PlusCircleIcon size={16} />
            <Link href={pageLinks.post}>Đăng tin miễn phí</Link>
          </Button>
        </div>
      </SectionContainer>

      <nav className="bg-primary text-white text-[13px] font-bold sticky top-0 z-50">
        <SectionContainer>
          <ul className="flex items-center h-[40px]">
            {navItems?.map((item) => (
              <li key={item.title} className="h-full">
                <Link
                  href={item.link}
                  className={cn(
                    pathname === item.link && "bg-secondary",
                    "h-full flex items-center hover:bg-secondary transition px-3"
                  )}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </SectionContainer>
      </nav>
    </header>
  );
};

export default HeaderContent;

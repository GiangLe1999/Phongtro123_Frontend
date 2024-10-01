import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FC } from "react";
import { pageLinks } from "../constants";

interface Props {
  pages: { name: string; link: string }[];
}

const CustomBreadcrumb: FC<Props> = ({ pages }): JSX.Element => {
  const allPages = [{ name: "Trang chủ", link: pageLinks.home }, ...pages];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {allPages.map((page, index) => {
          if (index === allPages.length - 1) {
            return (
              <BreadcrumbItem key={page.name}>
                <BreadcrumbPage className="font-bold">
                  {page.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            );
          }
          return (
            <BreadcrumbItem key={page.name}>
              <BreadcrumbPage className="hover:text-primary transition hover:underline">
                <Link href={page.link}>{page.name}</Link>
              </BreadcrumbPage>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;

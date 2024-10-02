import PrivateBreadcrumb from "@/src/components/layout/private-breadcrumb";
import { pageLinks } from "@/src/constants";
import { FC } from "react";
import NewPostForm from "./new-post-form";

interface Props {
  provinces: { id: string; name: string }[];
}

const NewPostPageContent: FC<Props> = ({ provinces }): JSX.Element => {
  return (
    <div>
      <PrivateBreadcrumb
        pages={[{ name: "Đăng tin mới", link: pageLinks.post }]}
      />

      <h1 className="font-bold text-3xl my-4">Đăng tin mới</h1>

      <div className="w-full border-t"></div>

      <div className="bg-[#FFF9E6] rounded-sm p-3 mt-6 mb-5 shadow-md text-sm">
        Nếu bạn đã từng đăng tin trên Phongtro123.com, hãy sử dụng chức năng{" "}
        <span className="font-bold">ĐẨY TIN / GIA HẠN / NÂNG CẤP VIP</span>{" "}
        trong mục QUẢN LÝ TIN ĐĂNG để làm mới, đẩy tin lên cao thay vì đăng tin
        mới. Tin đăng trùng nhau sẽ không được duyệt.
      </div>

      <NewPostForm provinces={provinces} />
    </div>
  );
};

export default NewPostPageContent;

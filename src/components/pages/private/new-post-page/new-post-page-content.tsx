"use client";

import PrivateBreadcrumb from "@/src/components/layout/private-breadcrumb";
import { pageLinks } from "@/src/constants";
import { FC, useState } from "react";
import NewPostForm from "./new-post-form";
import NewPostCheckout from "./new-post-checkout";
import { CreatePostingInput } from "@/src/__generated__/graphql";

interface Props {
  provinces: { id: string; name: string }[];
}

const NewPostPageContent: FC<Props> = ({ provinces }): JSX.Element => {
  const [showedContent, setShowedContent] = useState<"form" | "checkout">(
    "checkout"
  );
  const [formValue, setFormValue] = useState<CreatePostingInput>();

  return (
    <div>
      <PrivateBreadcrumb
        pages={[{ name: "Đăng tin mới", link: pageLinks.post }]}
      />

      <h1 className="font-bold text-3xl mt-4 mb-1">Đăng tin mới</h1>
      <p className="text-muted-foreground mb-4 font-semibold text-emerald-600">
        Bạn được quyền tạo tối đa 5 tin miễn phí
      </p>

      <div className="w-full border-t"></div>

      <div className="bg-[#FFF9E6] rounded-sm p-3 mt-6 mb-5 shadow-md text-sm">
        Nếu bạn đã từng đăng tin trên Phongtro123.com, hãy sử dụng chức năng{" "}
        <span className="font-bold">ĐẨY TIN / GIA HẠN / NÂNG CẤP VIP</span>{" "}
        trong mục QUẢN LÝ TIN ĐĂNG để làm mới, đẩy tin lên cao thay vì đăng tin
        mới. Tin đăng trùng nhau sẽ không được duyệt.
      </div>

      {showedContent === "form" ? (
        <NewPostForm
          provinces={provinces}
          setFormValue={setFormValue}
          setShowedContent={setShowedContent}
        />
      ) : (
        <NewPostCheckout formValue={formValue} />
      )}
    </div>
  );
};

export default NewPostPageContent;

"use client";

import PrivateBreadcrumb from "@/src/components/layout/private-breadcrumb";
import { pageLinks } from "@/src/constants";
import { FC, useState } from "react";
import NewPostForm from "./new-post-form";
import NewPostCheckout from "./new-post-checkout";
import {
  CreatePostingInput,
  District,
  Maybe,
  Province,
  Ward,
} from "@/src/__generated__/graphql";

interface Props {
  provinces: Maybe<Province[]> | undefined | [];
  districts: Maybe<District[]> | undefined | [];
  wards: Maybe<Ward[]> | undefined | [];
}

const NewPostPageContent: FC<Props> = ({
  provinces,
  districts,
  wards,
}): JSX.Element => {
  // Get Provinces & Set Provinces

  const [showedContent, setShowedContent] = useState<"form" | "checkout">(
    "form"
  );
  const [formValue, setFormValue] = useState<CreatePostingInput>();
  const [mediaFormValue, setMediaFormValue] = useState<{
    images: File[];
    videos: File[];
  }>({
    images: [],
    videos: [],
  });
  const [notSubmitValue, setNotSubmitValue] = useState<{
    ward_code: string;
    street: string;
    address_number: string;
    filteredDistricts: District[] | undefined | [];
    filteredWards: Ward[] | undefined | [];
    filterStreets: string[] | undefined | [];
    streetInputType: "text" | "select";
  }>();

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
          districts={districts}
          wards={wards}
          formValue={formValue}
          setFormValue={setFormValue}
          setShowedContent={setShowedContent}
          setMediaFormValue={setMediaFormValue}
          notSubmitValue={notSubmitValue}
          setNotSubmitValue={setNotSubmitValue}
        />
      ) : (
        <NewPostCheckout
          formValue={formValue}
          setShowedContent={setShowedContent}
          previousFormValue={formValue}
          mediaFormValue={mediaFormValue}
        />
      )}
    </div>
  );
};

export default NewPostPageContent;

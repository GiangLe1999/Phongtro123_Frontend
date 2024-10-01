"use client";

import { Button } from "@/components/ui/button";
import CustomBreadcrumb from "@/src/components/custom-breadcrumb";
import FillOtpForm from "@/src/components/xac-thuc-tai-khoan/fill-otp-form";
import SendOtpForm from "@/src/components/xac-thuc-tai-khoan/send-otp-form";
import { pageLinks, siteMetadata } from "@/src/constants";
import useGetUserForClient from "@/src/hooks/use-get-user-for-client";
import { NextPage } from "next";
import { signOut } from "next-auth/react";
import { useState } from "react";

interface Props {}

const Page: NextPage<Props> = () => {
  const user = useGetUserForClient();
  const [activeForm, setActiveForm] = useState("send-otp-form");

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-[600px] mx-auto pt-8">
        <CustomBreadcrumb
          pages={[{ name: "Xác thực tài khoản", link: "/xac-thuc-tai-khoan" }]}
        />
      </div>

      <main className="max-w-[600px] mx-auto pt-8 pb-16">
        <div className="bg-white border rounded-md shadow-md p-[30px]">
          <h1 className="font-bold text-primary text-3xl mb-2">
            Xác thực tài khoản
          </h1>
          {activeForm === "send-otp-form" ? (
            <SendOtpForm user={user} setActiveForm={setActiveForm} />
          ) : activeForm === "fill-otp-form" ? (
            <FillOtpForm user={user} />
          ) : null}

          <p className="text-sm leading-7">
            Bạn gặp khó khăn trong quá trình xác thực tài khoản? Vui lòng gọi{" "}
            <a
              href={`tel:${siteMetadata.tel}`}
              className="font-bold text-red-600 text-lg"
            >
              {siteMetadata.tel}
            </a>{" "}
            để chúng tôi hỗ trợ bạn
          </p>

          <Button
            type="button"
            onClick={() =>
              signOut({ callbackUrl: pageLinks.home, redirect: true })
            }
            className="w-full font-bold mt-6 hover:underline hover:opacity-90 transition-opacity"
            variant="secondary"
          >
            Đăng xuất
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Page;

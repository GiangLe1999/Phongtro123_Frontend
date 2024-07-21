"use client";

import { NextPage } from "next";

import CustomBreadcrumb from "@/src/components/custom-breadcrumb";
import SendForgotPasswordOtpForm from "@/src/components/quen-mat-khau/send-forgot-password-otp-form";
import { useState } from "react";
import FillForgotPasswordForm from "@/src/components/quen-mat-khau/fill-forgot-password-form";
import CreateNewPasswordForm from "@/src/components/quen-mat-khau/create-new-password-form";

interface Props {}

const Page: NextPage<Props> = () => {
  const [tel, setTel] = useState<string>("");
  const [activeForm, setActiveForm] = useState("send-forgot-password-otp-form");

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-[600px] mx-auto pt-8">
        <CustomBreadcrumb
          pages={[{ name: "Quên mật khẩu", link: "/quen-mat-khau" }]}
        />
      </div>

      <main className="max-w-[600px] mx-auto pt-8 pb-16">
        {activeForm === "send-forgot-password-otp-form" ? (
          <SendForgotPasswordOtpForm
            setActiveForm={setActiveForm}
            setTel={setTel}
          />
        ) : activeForm === "fill-forgot-password-otp-form" ? (
          <FillForgotPasswordForm tel={tel} setActiveForm={setActiveForm} />
        ) : activeForm === "create-new-password-form" ? (
          <CreateNewPasswordForm tel={tel} />
        ) : null}
      </main>
    </div>
  );
};

export default Page;

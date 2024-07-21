"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dispatch, FC, SetStateAction } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { gql, useMutation } from "@apollo/client";
import { toast } from "sonner";
import {
  VerifyForgotPasswordOtpInput,
  VerifyForgotPasswordOtpMutation,
  VerifyForgotPasswordOtpMutationVariables,
} from "@/src/__generated__/graphql";
import { ChevronsRightIcon, Loader2 } from "lucide-react";

const VERIFY_FORGOT_PASSWORD_OTP_MUTATION = gql`
  mutation verifyForgotPasswordOtp(
    $verifyForgotPasswordOtpInput: VerifyForgotPasswordOtpInput!
  ) {
    verifyForgotPasswordOtp(
      verifyForgotPasswordOtpInput: $verifyForgotPasswordOtpInput
    ) {
      ok
      error
    }
  }
`;

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Mã xác thực phải có đủ 6 ký tự.",
  }),
});

interface Props {
  tel: string;
  setActiveForm: Dispatch<SetStateAction<string>>;
}

const FillForgotPasswordForm: FC<Props> = ({
  tel,
  setActiveForm,
}): JSX.Element => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const [verifyForgotPasswordOtp, { loading }] = useMutation<
    VerifyForgotPasswordOtpMutation,
    VerifyForgotPasswordOtpMutationVariables
  >(VERIFY_FORGOT_PASSWORD_OTP_MUTATION);

  async function onSubmit(formValues: z.infer<typeof FormSchema>) {
    try {
      const { data } = await verifyForgotPasswordOtp({
        variables: {
          verifyForgotPasswordOtpInput: {
            otp: formValues.otp,
            tel,
          } as VerifyForgotPasswordOtpInput,
        },
      });

      if (data?.verifyForgotPasswordOtp?.ok) {
        toast.success("Xác nhận thành công", {
          description: "Vui lòng nhập lại mật khẩu mới và xác nhận.",
        });
        setActiveForm("create-new-password-form");
      } else {
        toast.error(data?.verifyForgotPasswordOtp?.error, {
          description: "Mã xác thực không chính xác hoặc đã hết hạn.",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Xác thực thất bại", {
        description: "Chúng tôi sẽ khắc phục vấn đề trong thời gian sớm nhất",
      });
    }
  }

  return (
    <div className="bg-white border rounded-md shadow-md p-[30px]">
      <h1 className="font-bold text-primary text-3xl mb-2">Nhập mã xác nhận</h1>
      <p className="text-sm leading-7 mb-4">
        Mã xác nhận đã được gửi đến <b>{tel}</b>. Vui lòng nhập mã vào bên dưới
        để tiếp tục tiến trình đổi mật khẩu mới.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="text-center">
                <FormLabel className="font-bold text-gray-700">
                  Mã xác thực
                </FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="mx-auto">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Vui lòng nhập mã xác thực với 6 ký tự.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full font-bold gap-1 mt-6">
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Đang xử lý...
              </>
            ) : (
              <>
                Tiếp tục <ChevronsRightIcon size={18} />
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FillForgotPasswordForm;

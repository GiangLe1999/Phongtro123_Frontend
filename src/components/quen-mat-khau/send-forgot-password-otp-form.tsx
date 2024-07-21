"use client";

import { Dispatch, FC, SetStateAction } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { regexes } from "@/src/constants";
import { toast } from "sonner";
import { ChevronsRightIcon, Loader2 } from "lucide-react";
import { gql, useMutation } from "@apollo/client";
import {
  SendForgotPasswordOtpMutation,
  SendForgotPasswordOtpMutationVariables,
  SendOtpInput,
} from "@/src/__generated__/graphql";

const SEND_FORGOT_PASSWORD_OTP_MUTATION = gql`
  mutation sendForgotPasswordOtp($sendForgotPasswordOtpInput: SendOtpInput!) {
    sendForgotPasswordOtp(
      sendForgotPasswordOtpInput: $sendForgotPasswordOtpInput
    ) {
      ok
      error
    }
  }
`;

interface Props {
  setActiveForm: Dispatch<SetStateAction<string>>;
  setTel: Dispatch<SetStateAction<string>>;
}

const formSchema = z.object({
  tel: z.string().regex(regexes.tel, {
    message: "Số điện thoại không hợp lệ",
  }),
});

const SendForgotPasswordOtpForm: FC<Props> = ({
  setActiveForm,
  setTel,
}): JSX.Element => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tel: "",
    },
  });

  const [sendForgotPasswordOtpMution, { loading }] = useMutation<
    SendForgotPasswordOtpMutation,
    SendForgotPasswordOtpMutationVariables
  >(SEND_FORGOT_PASSWORD_OTP_MUTATION);

  async function onSubmit(formValues: z.infer<typeof formSchema>) {
    try {
      const { data } = await sendForgotPasswordOtpMution({
        variables: {
          sendForgotPasswordOtpInput: formValues as SendOtpInput,
        },
      });

      if (data?.sendForgotPasswordOtp?.ok) {
        toast.success(`Gửi mã xác nhận thành công tới ${formValues.tel}`, {
          description:
            "Vui lòng nhập lại mã xác nhận để xác minh bạn là chủ tài khoản.",
        });

        setActiveForm("fill-forgot-password-otp-form");
      } else {
        toast.error("Gửi mã xác nhận thất bại", {
          description: data?.sendForgotPasswordOtp?.error,
        });
      }
    } catch (error) {
      toast.error("Gửi mã xác nhận thất bại", {
        description: "Chúng tôi sẽ sớm khắc phục vấn đề.",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white border rounded-md shadow-md p-[30px]"
      >
        <h1 className="font-bold text-primary text-3xl mb-2">
          Nhập SĐT liên kết
        </h1>
        <p className="text-sm leading-7 mb-4">
          Vui lòng nhập số điện thoại liên kết với tài khoản của bạn để nhận mã
          đặt lại mật khẩu
        </p>

        <FormField
          control={form.control}
          name="tel"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="SĐT liên kết với tài khoản"
                  type="number"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setTel(e.target.value);
                  }}
                />
              </FormControl>
              <FormDescription className="text-xs">
                Số điện thoại có độ dài tự 10~11 chữ số.
              </FormDescription>
              <FormMessage className="text-xs text-red-600" />
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
  );
};

export default SendForgotPasswordOtpForm;

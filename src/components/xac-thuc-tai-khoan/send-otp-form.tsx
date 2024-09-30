"use client";

import { Session } from "next-auth";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { regexes } from "@/src/constants";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { gql, useMutation } from "@apollo/client";
import {
  SendOtpMutation,
  SendOtpMutationVariables,
} from "@/src/__generated__/graphql";
import { toast } from "sonner";

export const SEND_OTP_MUTATION = gql`
  mutation sendOtp {
    sendOtp {
      ok
      error
    }
  }
`;

const formSchema = z.object({
  tel: z.string().regex(regexes.tel, {
    message: "Số điện thoại không hợp lệ",
  }),
});

interface Props {
  user: Session["user"] | null;
  setActiveForm: Dispatch<SetStateAction<string>>;
}

const SendOtpForm: FC<Props> = ({ user, setActiveForm }): JSX.Element => {
  const [sendOtpMutation, { loading }] = useMutation<
    SendOtpMutation,
    SendOtpMutationVariables
  >(SEND_OTP_MUTATION);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (!user) return;
    form.setValue("tel", user?.tel);
  }, [user, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data } = await sendOtpMutation();

      if (data?.sendOtp?.ok) {
        toast.success("Gửi mã xác thực thành công", {
          description: `Vui lòng kiểm tra tin nhắn tới SĐT ${user?.tel} và nhập vào OTP.`,
        });

        setActiveForm("fill-otp-form");
      } else {
        toast.error(data?.sendOtp?.error, {
          description: "Vui lòng kiểm tra lại SĐT.",
        });
      }
    } catch (error) {
      toast.error("Gửi OTP thất bại", {
        description: "Chúng tôi sẽ sớm khắc phục vấn đề.",
      });
    }
  }

  return (
    <>
      <p className="text-sm leading-7">
        Xin chào <strong>{user?.name}</strong>. Bạn cần xác thực số điện thoại
        trước khi tiếp tục. Nhập số điện thoại của bạn vào ô bên dưới, chúng tôi
        sẽ gửi mã xác minh qua tin nhắn SMS.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="my-6">
          <FormField
            control={form.control}
            name="tel"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-gray-700">
                  Số điện thoại của bạn
                </FormLabel>
                <FormControl>
                  <Input
                    disabled
                    className="text-xl font-bold text-gray-700 placeholder:text-base placeholder:font-normal placeholder:text-[#9CA3AF]"
                    placeholder="Vui lòng nhập chính xác SĐT"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-600" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full font-bold mt-6 hover:underline gap-1"
          >
            <>
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Đang gửi OTP...
                </>
              ) : (
                "Bấm để lấy mã (miễn phí)"
              )}
            </>
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SendOtpForm;

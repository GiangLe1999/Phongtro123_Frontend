"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Session } from "next-auth";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Loader2 } from "lucide-react";
import CountdownTimer from "./counter";
import { gql, useMutation } from "@apollo/client";
import { toast } from "sonner";
import {
  VerifyOtpMutation,
  VerifyOtpInput,
  VerifyOtpMutationVariables,
  SendOtpMutation,
  SendOtpMutationVariables,
} from "@/src/__generated__/graphql";
import { useRouter } from "next/navigation";
import { pageLinks } from "@/src/constants";
import { useSession } from "next-auth/react";
import { SEND_OTP_MUTATION } from "./send-otp-form";

const VERIFY_OTP_MUTATION = gql`
  mutation verifyOtp($verifyOtpInput: VerifyOtpInput!) {
    verifyOtp(verifyOtpInput: $verifyOtpInput) {
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
  user: Session["user"] | null;
}

const FillOtpForm: FC<Props> = ({ user }): JSX.Element => {
  const [count, setCount] = useState(900);
  const router = useRouter();
  const { data: session, update: updateSession } = useSession();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const [verifyOtpMution, { loading }] = useMutation<
    VerifyOtpMutation,
    VerifyOtpMutationVariables
  >(VERIFY_OTP_MUTATION);

  const [sendOtpMutation, { loading: resendOtpLoading }] = useMutation<
    SendOtpMutation,
    SendOtpMutationVariables
  >(SEND_OTP_MUTATION);

  async function onSubmit(formValues: z.infer<typeof FormSchema>) {
    try {
      const { data } = await verifyOtpMution({
        variables: { verifyOtpInput: formValues as VerifyOtpInput },
      });

      if (data?.verifyOtp?.ok) {
        toast.success("Xác thực tài khoản thành công", {
          description:
            "Bạn đã có thể sử dụng các chức năng quản lý tại Phongtro123",
        });

        const newSession = {
          ...session,
          user: {
            ...session?.user,
            verified: true,
          },
        };

        await updateSession(newSession);

        window.location.reload();
        router.replace(pageLinks.home);
      } else {
        toast.error(data?.verifyOtp?.error, {
          description: "Mã xác thực không chính xác hoặc đã hết hạn.",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Xác thực tài khoản thất bại", {
        description: "Chúng tôi sẽ khắc phục vấn đề trong thời gian sớm nhất",
      });
    }
  }

  async function resendOtp() {
    try {
      const { data } = await sendOtpMutation();

      if (data?.sendOtp?.ok) {
        toast.success("Gửi lại xác thực thành công", {
          description: `Vui lòng kiểm tra tin nhắn tới SĐT ${user?.tel} và nhập vào OTP.`,
        });
        setCount(900);
      } else {
        toast.error(data?.sendOtp?.error, {
          description: "Vui lòng kiểm tra lại SĐT.",
        });
      }
    } catch (error) {
      toast.error("Gửi lại mã xác thực thất bại", {
        description: "Chúng tôi sẽ sớm khắc phục vấn đề.",
      });
    }
  }

  return (
    <>
      <p className="text-sm leading-7">
        Mã xác nhận đã được gửi đến <b>{user?.tel}</b>. Vui lòng nhập mã vào bên
        dưới để tiếp tục.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-3 space-y-6 mb-2"
        >
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

          <Button
            className="w-full font-bold mt-6 hover:underline gap-1"
            type="submit"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Xác thực tài khoản
                <CountdownTimer count={count} setCount={setCount} />
              </>
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center mb-6">
        {resendOtpLoading ? (
          <div className="flex items-center w-fit mx-auto text-sm h-10">
            <Loader2 className="animate-spin w-3 h-3 mr-2" />
            Đang gửi lại OTP...
          </div>
        ) : (
          <Button
            onClick={resendOtp}
            type="button"
            className="underline font-bold"
            variant="link"
          >
            Gửi lại OTP
          </Button>
        )}
      </div>
    </>
  );
};

export default FillOtpForm;

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
  ResendOtpMutation,
  ResendOtpMutationVariables,
} from "@/src/__generated__/graphql";
import { useRouter } from "next/navigation";
import { pageLinks } from "@/src/constants";

const VERIFY_OTP_MUTATION = gql`
  mutation verifyOtp($verifyOtpInput: VerifyOtpInput!) {
    verifyOtp(verifyOtpInput: $verifyOtpInput) {
      ok
      error
    }
  }
`;

const RESEND_OTP_MUTATION = gql`
  mutation resendOtp {
    resendOtp {
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
  session: Session | null;
  updateSession: any;
}

const FillOtpForm: FC<Props> = ({
  user,
  session,
  updateSession,
}): JSX.Element => {
  const [count, setCount] = useState(60);
  const canResendOtp = count === 0;
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const [verifyOtpMution, { loading }] = useMutation<
    VerifyOtpMutation,
    VerifyOtpMutationVariables
  >(VERIFY_OTP_MUTATION, {
    context: {
      headers: {
        Authorization: `Bearer ${session?.backendTokens.accessToken}`,
      },
    },
  });

  const [resendOtpMution, { loading: resendLoading }] = useMutation<
    ResendOtpMutation,
    ResendOtpMutationVariables
  >(RESEND_OTP_MUTATION, {
    context: {
      headers: {
        Authorization: `Bearer ${session?.backendTokens.accessToken}`,
      },
    },
  });

  async function onSubmit(formValues: z.infer<typeof FormSchema>) {
    try {
      if (canResendOtp) {
        await resendOtp();
      }

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
      const { data } = await resendOtpMution();

      if (data?.resendOtp?.ok) {
        toast.success("Gửi lại xác thực thành công", {
          description: `Vui lòng kiểm tra tin nhắn tới SĐT ${user?.tel} và nhập vào OTP.`,
        });
        setCount(60);
      } else {
        toast.error(data?.resendOtp?.error, {
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
          className="mt-3 space-y-6 mb-6"
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

          {canResendOtp ? (
            <Button
              className="w-full font-bold mt-6 hover:underline gap-1"
              type="button"
              onClick={resendOtp}
            >
              {resendLoading ? (
                <>
                  <Loader2 className="animate-spin" /> Đang xử lý...
                </>
              ) : (
                "Gửi lại mã xác thực"
              )}
            </Button>
          ) : (
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
          )}
        </form>
      </Form>
    </>
  );
};

export default FillOtpForm;

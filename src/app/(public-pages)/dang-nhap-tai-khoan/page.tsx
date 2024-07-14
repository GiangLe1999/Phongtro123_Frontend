"use client";
import { NextPage } from "next";
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { pageLinks, regexes } from "@/src/constants";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import CustomBreadcrumb from "@/src/components/custom-breadcrumb";
import useGetUserForClient from "@/src/hooks/use-get-user-for-client";

const formSchema = z.object({
  tel: z.string().regex(regexes.tel, {
    message: "Số điện thoại không hợp lệ",
  }),

  password: z
    .string()
    .min(6, { message: "Mật khẩu phải có ít nhất 6 kí tự." })
    .max(50, { message: "Mật khẩu phải chỉ chứa tối đa 50 kí tự." })
    .regex(regexes.password, {
      message:
        "Mật khẩu phải chứa ít nhất 1 chữ cái, 1 chữ số và 1 kí tự đặc biệt.",
    }),
});

interface Props {}

const Page: NextPage<Props> = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const user = useGetUserForClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tel: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        tel: values.tel,
        password: values.password,
      });

      if (result?.ok) {
        toast.success("Đăng nhập thành công", {
          description: "Tiến hành chuyển hướng tới Trang chủ.",
        });
        router.replace(pageLinks.home);
      } else {
        toast.error("Đăng nhập thất bại", {
          description: "Vui lòng kiểm tra lại thông tin đăng nhập.",
        });
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại", {
        description: "Chúng tôi sẽ sớm khắc phục vấn đề.",
      });
    }
    setLoading(false);
  }

  if (user) {
    router.replace(pageLinks.home);
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-[600px] mx-auto pt-8">
        <CustomBreadcrumb
          pages={[{ name: "Đăng nhập", link: "/dang-nhap-tai-khoan" }]}
        />
      </div>

      <main className="max-w-[600px] mx-auto  pt-8 pb-16">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 bg-white border rounded-md shadow-md p-[30px]"
          >
            <h1 className="font-bold text-primary text-3xl mb-2">Đăng nhập</h1>

            <FormField
              control={form.control}
              name="tel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-gray-700">
                    Số điện thoại
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Số điện thoại"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Số điện thoại có độ dài tự 10~11 chữ số.
                  </FormDescription>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-gray-700">
                    Mật khẩu
                  </FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Mật khẩu" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Mật khẩu có độ dài từ 2~50 ký tự, phải chứa cả chữ và số.
                  </FormDescription>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full font-bold gap-1">
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Đang xử lý...
                </>
              ) : (
                "Đăng nhập"
              )}
            </Button>

            <div className="text-xs text-gray-500 flex justify-between gap-2">
              <Link
                className="text-primary font-bold hover:underline hover:text-secondary"
                href={pageLinks.forgot_password}
              >
                Bạn quên mật khẩu?
              </Link>
              <Link
                className="text-primary font-bold hover:underline hover:text-secondary"
                href={pageLinks.register}
              >
                Tạo tài khoản mới
              </Link>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
};

export default Page;

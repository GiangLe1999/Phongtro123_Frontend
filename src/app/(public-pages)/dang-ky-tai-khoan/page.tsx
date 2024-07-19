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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { pageLinks, regexes } from "@/src/constants";
import { gql, useMutation } from "@apollo/client";
import { Loader2 } from "lucide-react";
import {
  CreateUserInput,
  CreateUserMutation,
  CreateUserMutationVariables,
} from "@/src/__generated__/graphql";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import CustomBreadcrumb from "@/src/components/custom-breadcrumb";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Họ tên phải có ít nhất 2 kí tự." })
    .max(50, { message: "Họ tên chỉ chứa tối đa 50 kí tự." })
    .regex(regexes.name, {
      message: "Họ tên chỉ chứa chữ cái và khoảng trắng.",
    }),

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

  role: z.enum(["searcher", "owner", "broker"], {
    required_error: "Bạn phải chọn loại tài khoản.",
  }),
});

interface Props {}

const REGISTER_MUTATION = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      ok
      error
    }
  }
`;

const Page: NextPage<Props> = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      tel: "",
      password: "",
      role: "searcher",
    },
  });

  const router = useRouter();

  const [registerMutation, { loading }] = useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(REGISTER_MUTATION, {
    context: {
      headers: {
        "apollo-require-preflight": true,
        "content-type": "application/x-www-form-urlencoded",
      },
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data } = await registerMutation({
        variables: {
          createUserInput: values as CreateUserInput,
        },
      });

      if (data?.createUser?.ok) {
        toast.success("Đăng ký tài khoản thành công", {
          description: "Vui lòng đăng nhập vào tài khoản để sử dụng.",
        });
        router.replace(pageLinks.login);
      } else {
        toast.error(data?.createUser?.error, {
          description: "Vui lòng kiểm tra lại thông tin đăng ký.",
          action: {
            label: "Okay",
            onClick: form.setFocus("tel") as any,
          },
        });
      }
    } catch (error) {
      toast.error("Đăng ký tài khoản thất bại", {
        description: "Chúng tôi sẽ sớm khắc phục vấn đề.",
      });
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-[600px] mx-auto pt-8">
        <CustomBreadcrumb
          pages={[{ name: "Đăng ký", link: "/dang-ky-tai-khoan" }]}
        />
      </div>

      <main className="max-w-[600px] mx-auto pt-8 pb-16">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 bg-white border rounded-md shadow-md p-[30px]"
          >
            <h1 className="font-bold text-primary text-3xl mb-2">
              Tạo tài khoản mới
            </h1>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-gray-700">
                    Họ tên
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Họ tên" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Họ tên có độ dài từ 2~50 ký tự.
                  </FormDescription>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="font-bold text-gray-700 mb-[6px]">
                    Loại tài khoản
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="p-5 border border-dashed flex items-center justify-between gap-2 rounded-md"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="searcher" />
                        </FormControl>
                        <FormLabel className="font-semibold cursor-pointer text-sm text-gray-500">
                          Tìm kiếm
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="owner" />
                        </FormControl>
                        <FormLabel className="font-semibold cursor-pointer text-sm text-gray-500">
                          Chính chủ
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="broker" />
                        </FormControl>
                        <FormLabel className="font-semibold cursor-pointer text-sm text-gray-500">
                          Môi giới
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
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
                "Tạo tài khoản"
              )}
            </Button>

            <div className="text-xs text-gray-500 space-y-2">
              <p>
                Bấm vào nút đăng ký tức là bạn đã đồng ý với{" "}
                <Link
                  className="text-primary font-bold hover:underline"
                  href="/"
                >
                  quy định sử dụng
                </Link>{" "}
                của chúng tôi
              </p>
              <p>
                Bạn đã có tài khoản?{" "}
                <Link
                  className="text-primary font-bold hover:underline"
                  href={pageLinks.login}
                >
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
};

export default Page;

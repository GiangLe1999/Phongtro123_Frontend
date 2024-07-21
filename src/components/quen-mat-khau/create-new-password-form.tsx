"use client";

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
import { pageLinks, regexes } from "@/src/constants";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { CircleCheckBigIcon, Loader2 } from "lucide-react";
import { FC } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  CreateNewPasswordInput,
  CreateNewPasswordMutation,
  CreateNewPasswordMutationVariables,
} from "@/src/__generated__/graphql";
import { useRouter } from "next/navigation";

const CREATE_NEW_PASSWORD_MUTATION = gql`
  mutation createNewPassword($createNewPasswordInput: CreateNewPasswordInput!) {
    createNewPassword(createNewPasswordInput: $createNewPasswordInput) {
      ok
      error
    }
  }
`;

const formSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Mật khẩu phải có ít nhất 6 kí tự." })
      .max(50, { message: "Mật khẩu phải chỉ chứa tối đa 50 kí tự." })
      .regex(regexes.password, {
        message:
          "Mật khẩu phải chứa ít nhất 1 chữ cái, 1 chữ số và 1 kí tự đặc biệt.",
      }),
    confirm_password: z
      .string()
      .min(6, { message: "Mật khẩu phải có ít nhất 6 kí tự." })
      .max(50, { message: "Mật khẩu phải chỉ chứa tối đa 50 kí tự." })
      .regex(regexes.password, {
        message:
          "Mật khẩu phải chứa ít nhất 1 chữ cái, 1 chữ số và 1 kí tự đặc biệt.",
      }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Mật khẩu xác nhận không khớp.",
    path: ["confirm_password"],
  });

interface Props {
  tel: string;
}

const CreateNewPasswordForm: FC<Props> = ({ tel }): JSX.Element => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const [createNewPassword, { loading }] = useMutation<
    CreateNewPasswordMutation,
    CreateNewPasswordMutationVariables
  >(CREATE_NEW_PASSWORD_MUTATION);

  async function onSubmit(formValues: z.infer<typeof formSchema>) {
    try {
      const { data } = await createNewPassword({
        variables: {
          createNewPasswordInput: {
            tel,
            password: formValues.password,
          } as CreateNewPasswordInput,
        },
      });

      if (data?.createNewPassword?.ok) {
        toast.success("Đổi mật khẩu thành công", {
          description:
            "Tiếp tục đăng nhập với mật khẩu mới để sử dụng Phongtro123.",
        });
        router.replace(pageLinks.login);
      } else {
        toast.error("Đổi mật khẩu thất bại", {
          description: data?.createNewPassword?.error,
        });
      }
    } catch (error) {
      toast.error("Đổi mật khẩu thất bại", {
        description: "Chúng tôi sẽ sớm khắc phục vấn đề.",
      });
    }
  }

  return (
    <div className="bg-white border rounded-md shadow-md p-[30px]">
      <h1 className="font-bold text-primary text-3xl mb-2">Tạo mật khẩu mới</h1>
      <p className="text-sm leading-7 mb-4">
        Hãy nhập mật khẩu mới thật dễ nhớ và lưu lại kĩ nhé!
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-gray-700">
                  Mật khẩu mới
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
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-gray-700">
                  Xác nhận mật khẩu mới
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Xác nhận mật khẩu mới"
                    {...field}
                  />
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
              <>
                <CircleCheckBigIcon size={18} /> Hoàn tất
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateNewPasswordForm;

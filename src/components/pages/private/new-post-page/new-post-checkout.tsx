import { CreatePostingInput, PackageType } from "@/src/__generated__/graphql";
import { useSession } from "next-auth/react";
import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Attention from "./attention";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const FormSchema = z.object({
  package_type: z.string(),
  time_type: z.string().optional(),
  days: z.string().optional(),
  has_badge: z.boolean().optional(),
  checkout_type: z.string({
    required_error: "Vui lòng chọn phương thức thanh toán.",
  }),
});

interface Props {
  formValue: CreatePostingInput | undefined;
}

const NewPostCheckout: FC<Props> = ({ formValue }): JSX.Element => {
  const { data: session } = useSession();

  // Form States
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  // Derived States
  const chosePackageType = form.watch("package_type");

  function onSubmit(data: z.infer<typeof FormSchema>) {}

  return (
    <div>
      <h1 className="font-bold text-2xl line-clamp-1">{formValue?.title}</h1>
      <div className="flex gap-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-[60%] shrink-0"
          >
            <div className="grid grid-cols-3 gap-4">
              {/* Package Type */}
              <FormField
                control={form.control}
                name="package_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại tin</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại tin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={PackageType.Free}>
                          Tin miễn phí (0₫/ngày)
                        </SelectItem>
                        <SelectItem value={PackageType.Basic}>
                          Tin thường (2.000₫/ngày)
                        </SelectItem>
                        <SelectItem value={PackageType.Vip3}>
                          Tin VIP 3 (10.000₫/ngày)
                        </SelectItem>
                        <SelectItem value={PackageType.Vip2}>
                          Tin VIP 2 (20.000₫/ngày)
                        </SelectItem>
                        <SelectItem value={PackageType.Vip1}>
                          Tin VIP 1 (30.000₫/ngày)
                        </SelectItem>
                        <SelectItem value={PackageType.Vip}>
                          Tin VIP nổi bật (50.000₫/ngày)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Vui lòng chọn loại tin</FormDescription>
                  </FormItem>
                )}
              />

              {chosePackageType !== PackageType.Free && (
                <>
                  {/* Time Type */}
                  <FormField
                    control={form.control}
                    name="time_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gói thời gian</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn gói thời gian" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Ngày">Đăng theo ngày</SelectItem>
                            <SelectItem value="Tuần">Đăng theo tuần</SelectItem>
                            <SelectItem value="Tháng">
                              Đăng theo tháng
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Vui lòng chọn gói thời gian
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  {/* Days */}
                  <FormField
                    control={form.control}
                    name="days"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số ngày</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn số ngày" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {[...Array(90).keys()].map((i: number) => (
                              <SelectItem key={i} value={(i + 1).toString()}>
                                {i + 1} ngày
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>Vui lòng chọn số ngày</FormDescription>
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>

            <FormField
              control={form.control}
              name="has_badge"
              render={({ field }) => (
                <FormItem className="flex gap-2 items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-[6px]"
                    />
                  </FormControl>
                  <FormLabel className="!cursor-pointer">
                    Gắn nhãn{" "}
                    <span className="font-light">
                      - Cho thuê nhanh (2.000₫/ngày)
                    </span>
                  </FormLabel>
                </FormItem>
              )}
            />

            <h2 className="font-bold text-2xl !mt-10">
              Chọn phương thức thanh toán
            </h2>
            <FormField
              control={form.control}
              name="checkout_type"
              render={({ field }) => (
                <FormItem className="space-y-3 !mt-4">
                  <FormLabel>Notify me about...</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="current_account" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Trừ tiền trong tài khoản Phongtro123 (Bạn đang có: TK
                          Chính 0)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="mentions" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Direct messages and mentions
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="none" />
                        </FormControl>
                        <FormLabel className="font-normal">Nothing</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <Attention />
      </div>
    </div>
  );
};

export default NewPostCheckout;

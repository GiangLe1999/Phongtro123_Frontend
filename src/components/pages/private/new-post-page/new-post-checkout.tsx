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
import { formatVNDCurrency } from "@/src/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const packageInfo = [
  {
    title: "Tin miễn phí",
    value: PackageType.Free,
    day: 0,
    week: 0,
    month: 0,
  },
  {
    title: "Tin thường",
    value: PackageType.Basic,
    day: 2000,
    week: 12000,
    month: 48000,
  },
  {
    title: "Tin VIP 3",
    value: PackageType.Vip3,
    day: 10000,
    week: 63000,
    month: 240000,
  },
  {
    title: "Tin VIP 2",
    value: PackageType.Vip2,
    day: 20000,
    week: 133000,
    month: 540000,
  },
  {
    title: "Tin VIP 1",
    value: PackageType.Vip1,
    day: 30000,
    week: 190000,
    month: 800000,
  },
  {
    title: "Tin VIP nổi bật",
    value: PackageType.Vip,
    day: 50000,
    week: 315000,
    month: 1200000,
  },
];

const timeTypes = {
  day: {
    range: 90,
    unit: "ngày",
  },
  week: {
    range: 10,
    unit: "tuần",
  },
  month: {
    range: 12,
    unit: "tháng",
  },
};

const FormSchema = z.object({
  package_type: z.string(),
  time_type: z.string().optional(),
  duration: z.string().optional(),
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
    defaultValues: {
      package_type: PackageType.Free,
    },
  });

  // Derived States
  const chosePackageType = form.watch("package_type");
  const choseTimeType = form.watch("time_type");
  const choseDuration = form.watch("duration");
  let timeUnit =
    timeTypes[(choseTimeType as keyof typeof timeTypes) || "day"].unit;

  const totalAmount =
    (packageInfo.find((p) => p.value === chosePackageType)?.[
      (choseTimeType as keyof typeof timeTypes) || "day"
    ] || 0) * Number(choseDuration) || 0;

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
                        {packageInfo.map((p) => (
                          <SelectItem key={p.value} value={p.value}>
                            {`${p.title} (${formatVNDCurrency(
                              p[(choseTimeType as keyof typeof p) || "day"]
                            )}/${timeUnit})`}
                          </SelectItem>
                        ))}
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
                            <SelectItem value="day">Đăng theo ngày</SelectItem>
                            <SelectItem value="week">Đăng theo tuần</SelectItem>
                            <SelectItem value="month">
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

                  {/* Duration */}
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số {timeUnit}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={`Chọn số ${timeUnit}`}
                              />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {[
                              ...Array(
                                timeTypes[
                                  choseTimeType as keyof typeof timeTypes
                                ]?.range || 0
                              ).keys(),
                            ].map((i: number) => (
                              <SelectItem key={i} value={(i + 1).toString()}>
                                {i + 1} {timeUnit}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Vui lòng chọn số {timeUnit}
                        </FormDescription>
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
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-3"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="account" />
                        </FormControl>
                        <FormLabel className="!font-normal flex items-center gap-2 cursor-pointer">
                          <Image
                            src="/logo-phongtro-123.svg"
                            alt="Thanh toán bằng số dư trong tài khoản Phongtro123"
                            width={90}
                            height={16.5}
                          />
                          Trừ tiền trong Tài khoản Phongtro123 (Bạn đang có: TK
                          Chính{" "}
                          {formatVNDCurrency(
                            session?.user?.balance.toString() || 0
                          )}
                          )
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="qr" />
                        </FormControl>
                        <FormLabel className="!font-normal cursor-pointer">
                          Thanh toán qua Thẻ ngân hàng / Ví điện tử
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className="w-full hover:bg-gray-100 transition"
                onClick={() => {}}
              >
                Quay lai
              </Button>

              <Button
                type="submit"
                className="w-full"
                // disabled={!form.formState.isValid}
              >
                Thanh toán: {formatVNDCurrency(totalAmount)}
              </Button>
            </div>
          </form>
        </Form>

        <Attention />
      </div>
    </div>
  );
};

export default NewPostCheckout;

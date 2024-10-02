"use client";

import { FC, use, useEffect, useRef, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
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

import AdddressMap from "./address-map";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FormSchema = z.object({
  address_number: z
    .string({
      required_error: "Số nhà là bắt buộc.",
    })
    .min(1, "Số nhà không được để trống."),

  province: z
    .string({
      required_error: "Tỉnh/Thành phố là bắt buộc.",
    })
    .min(1, "Tỉnh/Thành phố không được để trống."),

  district: z
    .string({
      required_error: "Quận/huyện là bắt buộc.",
    })
    .min(1, "Quận/huyện không được để trống."),

  ward: z
    .string({
      required_error: "Phường/xã là bắt buộc.",
    })
    .min(1, "Phường/xã không được để trống."),

  street: z
    .string({
      required_error: "Tên đường là bắt buộc.",
    })
    .min(1, "Tên đường không được để trống."),
});

interface Props {
  provinces: { id: string; name: string }[];
}

const NewPostForm: FC<Props> = ({ provinces }): JSX.Element => {
  // Districts States
  const [districts, setDistricts] = useState<{ id: string; name: string }[]>(
    []
  );
  const [getDistrictsLoading, setGetDistrictsLoading] = useState(false);

  // Wards States
  const [wards, setWards] = useState<{ id: string; name: string }[]>([]);
  const [getWardsLoading, setGetWardsLoading] = useState(false);

  // Form States
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      address_number: "",
      province: "",
      district: "",
      ward: "",
      street: "",
    },
    mode: "onChange",
  });

  // Derived States
  const errors = form.formState.errors;
  const choseProvince = form.watch("province");
  const initialChoseProvince = provinces.find((p) => p.id === choseProvince);

  const choseDistrict = form.watch("district");
  const initialChoseDistrict = districts.find((d) => d.id === choseDistrict);

  const choseWard = form.watch("ward");
  const initialChoseWard = wards.find((w) => w.id === choseWard);

  const choseStreet = form.watch("street");
  const choseAddressNumber = form.watch("address_number");
  const fullAddress = `${
    choseAddressNumber ? `Số ${choseAddressNumber}, ` : ""
  } ${choseStreet ? `${choseStreet}, ` : ""}${
    choseWard ? `${initialChoseWard?.name}, ` : ""
  }${choseDistrict ? `${initialChoseDistrict?.name}, ` : ""}${
    choseProvince ? `${initialChoseProvince?.name}` : ""
  }`;

  // Submit Form
  function onSubmit(data: z.infer<typeof FormSchema>) {}

  // Get Districts & Set Districts
  const getDistricts = async () => {
    setGetDistrictsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_LOCATION_LIST_BASE_API}/2/${choseProvince}.htm`
      );

      if (!res.ok) {
        console.log("Lấy dữ liệu quận/huyện không thành công.");
      }

      const { data } = await res.json();
      setDistricts(data);
      setGetDistrictsLoading(false);
    } catch (error) {
      console.log("Lấy dữ liệu quận/huyện không thành công.");
      setGetDistrictsLoading(false);
    }
  };
  useEffect(() => {
    getDistricts();
  }, [choseProvince]);

  // Get Wards & Set Wards
  const getWards = async () => {
    setGetWardsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_LOCATION_LIST_BASE_API}/3/${choseDistrict}.htm`
      );

      if (!res.ok) {
        console.log("Lấy dữ liệu phường/xã không thành công.");
      }

      const { data } = await res.json();
      setWards(data);
      setGetWardsLoading(false);
    } catch (error) {
      console.log("Lấy dữ liệu phường/xã không thành công.");
      setGetWardsLoading(false);
    }
  };
  useEffect(() => {
    getWards();
  }, [choseDistrict]);

  return (
    <div className="flex">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-[70%]"
        >
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tỉnh/Thành phố</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="--Chọn Tỉnh/Thành phố--" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {provinces.map((province) => (
                        <SelectItem value={province.id} key={province.id}>
                          {province.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.province ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>
                      Vui lòng chọn Tỉnh/Thành phố
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quận/Huyện</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={getDistrictsLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="--Chọn Quận/Huyện--" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {districts.map((district) => (
                        <SelectItem value={district.id} key={district.id}>
                          {district.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.district ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>Vui lòng chọn Quận/Huyện</FormDescription>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ward"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phường/Xã</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={getWardsLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="--Chọn Phường/Xã--" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {wards.map((ward) => (
                        <SelectItem value={ward.id} key={ward.id}>
                          {ward.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.ward ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>Vui lòng chọn Phường/Xã</FormDescription>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Đường/Phố</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập Đường/Phố" {...field} />
                  </FormControl>
                  {errors.ward ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>Vui lòng nhập Đường/Phố</FormDescription>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số nhà</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập số nhà" {...field} />
                  </FormControl>
                  {errors.address_number ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>Vui lòng nhập số nhà</FormDescription>
                  )}
                </FormItem>
              )}
            />
          </div>

          <FormItem>
            <FormLabel>Địa chỉ chính xác</FormLabel>
            <Input
              type="address"
              id="full_address"
              placeholder="Địa chỉ chính xác"
              disabled
              value={fullAddress}
            />
          </FormItem>

          <Button type="submit">Submit</Button>
        </form>
      </Form>

      <div className="flex-1 aspect-square">
        <AdddressMap
          location={{
            address_number: choseAddressNumber,
            street: choseStreet,
            province: initialChoseProvince?.name || "",
            district: initialChoseDistrict?.name || "",
            ward: initialChoseWard?.name || "",
          }}
        />
      </div>
    </div>
  );
};

export default NewPostForm;

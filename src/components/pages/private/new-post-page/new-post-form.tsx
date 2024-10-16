"use client";

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

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

import AdddressMap from "./address-map";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import {
  CreatePostingInput,
  District,
  Maybe,
  PackageType,
  Province,
  TentnantType,
  Ward,
} from "@/src/__generated__/graphql";
import ImageDropzone from "@/src/components/image-dropzone";
import VideoDropzone from "@/src/components/video-dropzone";
import { ArrowRightIcon } from "lucide-react";
import Attention from "./attention";
import { regexes } from "@/src/constants";

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

  category: z
    .string({
      required_error: "Loại chuyên mục là bắt buộc.",
    })
    .min(1, "Loại chuyên mục không được để trống."),

  title: z
    .string({
      required_error: "Tiêu đề là bắt buộc.",
    })
    .min(1, "Tiêu đề không được để trống."),

  main_content: z
    .string({
      required_error: "Nội dung mô tả là bắt buộc.",
    })
    .min(1, "Nội dung mô tả không được để trống."),

  price: z
    .number({
      required_error: "Giá cho thuê là bắt buộc.",
    })
    .min(1, "Giá cho thuê không được để trống."),

  area: z
    .string({
      required_error: "Diện tích là bắt buộc.",
    })
    .min(1, "Diện tích không được để trống."),

  tenant_type: z
    .string({
      required_error: "Đối tượng cho thuê là bắt buộc.",
    })
    .min(1, "Đối tượng cho thuê không được để trống."),

  maps_embed_link: z
    .string({
      required_error: "Link Google Maps là bắt buộc.",
    })
    .min(1, "Link Google Maps không được để trống.")
    .regex(regexes.maps_embed_link, "Link Google Maps không hợp lệ."),

  name: z.string().min(1),

  tel: z.string().min(1),

  images: z.array(z.instanceof(File)).optional(),

  videos: z
    .array(z.instanceof(File))
    .refine((files) => files.every((file) => file.type.startsWith("video/")), {
      message: "Chỉ các tệp video được cho phép.",
    })
    .optional(),
});

interface Props {
  provinces: Maybe<Province[]> | undefined | [];
  districts: Maybe<District[]> | undefined | [];
  wards: Maybe<Ward[]> | undefined | [];
  formValue: CreatePostingInput | undefined;
  setFormValue: Dispatch<SetStateAction<CreatePostingInput | undefined>>;
  setShowedContent: Dispatch<SetStateAction<"form" | "checkout">>;
  setMediaFormValue: Dispatch<
    SetStateAction<{ images: File[]; videos: File[] }>
  >;
  notSubmitValue:
    | {
        ward_code: string;
        street: string;
        address_number: string;
        filteredDistricts: District[] | undefined | [];
        filteredWards: Ward[] | undefined | [];
        filterStreets: string[] | undefined | [];
        streetInputType: "text" | "select";
      }
    | undefined;
  setNotSubmitValue: Dispatch<
    SetStateAction<
      | {
          ward_code: string;
          street: string;
          address_number: string;
          filteredDistricts: District[] | undefined | [];
          filteredWards: Ward[] | undefined | [];
          filterStreets: string[] | undefined | [];
          streetInputType: "text" | "select";
        }
      | undefined
    >
  >;
}

const NewPostForm: FC<Props> = ({
  provinces,
  districts,
  wards,
  formValue,
  setFormValue,
  setShowedContent,
  setMediaFormValue,
  notSubmitValue,
  setNotSubmitValue,
}): JSX.Element => {
  // Get Session
  const { data: session } = useSession();

  // Districts States
  const [filteredDistricts, setFilteredDistricts] = useState<District[]>(
    notSubmitValue?.filteredDistricts ? notSubmitValue?.filteredDistricts : []
  );

  // Wards States
  const [filteredWards, setFilteredWards] = useState<Ward[]>(
    notSubmitValue?.filteredWards ? notSubmitValue?.filteredWards : []
  );

  // Streets States
  const [streets, setStreets] = useState<string[]>(
    notSubmitValue?.filterStreets ? notSubmitValue?.filterStreets : []
  );
  const [getStreetsLoading, setGetStreetsLoading] = useState(false);
  const [streetInputType, setStreetInputType] = useState<"text" | "select">(
    notSubmitValue?.streetInputType ? notSubmitValue?.streetInputType : "text"
  );

  // Form States
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  // Derived States
  const errors = form.formState.errors;
  const choseProvince = form.watch("province");
  const initialChoseProvince = provinces?.find((p) => p.code === choseProvince);

  const choseDistrict = form.watch("district");
  const initialChoseDistrict = districts?.find((d) => d.code === choseDistrict);

  const choseWard = form.watch("ward");
  const initialChoseWard = wards?.find((w) => w.code === choseWard);

  const choseStreet = form.watch("street");
  const choseAddressNumber = form.watch("address_number");

  const fullAddress = `${
    choseAddressNumber ? `Số ${choseAddressNumber}, ` : ""
  } ${choseStreet ? `${choseStreet}, ` : ""}${
    choseWard ? `${initialChoseWard?.name}, ` : ""
  }${choseDistrict ? `${initialChoseDistrict?.name}, ` : ""}${
    choseProvince ? `${initialChoseProvince?.name}` : ""
  }`;

  // Filter Districts
  const filterDistricts = () => {
    if (!choseProvince) return;
    const districtsOfProvince = districts?.filter(
      (d) => d?.province?.code === choseProvince
    );
    setFilteredDistricts(districtsOfProvince || []);
  };

  useEffect(() => {
    filterDistricts();
  }, [choseProvince]);

  // Get Wards & Set Wards
  const filterWards = () => {
    if (!choseDistrict) return;
    const wardsOfDistrict = wards?.filter(
      (w) => w?.district?.code === choseDistrict
    );
    setFilteredWards(wardsOfDistrict || []);
  };

  useEffect(() => {
    filterWards();
  }, [choseDistrict]);

  // Get Streets & Set Streets
  const getStreets = async () => {
    if (!choseWard) return;
    setGetStreetsLoading(true);
    const getBoudingBoxUrl = `${
      process.env.NEXT_PUBLIC_GET_BOUNDING_BOX_BASE_API
    }${initialChoseWard?.name.replace(
      / /g,
      "+"
    )},${initialChoseDistrict?.name.replace(
      / /g,
      "+"
    )},${initialChoseProvince?.name.replace(
      / /g,
      "+"
    )}&class=boundary&type=administrative`;

    try {
      const boundingBoxRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/boundary-box`,
        {
          method: "POST",
          body: JSON.stringify(getBoudingBoxUrl),
        }
      );

      if (!boundingBoxRes.ok) {
        console.log("Lấy bouding box của phường/xã không thành công.");
      }

      const boundingBoxData = await boundingBoxRes.json();

      if (boundingBoxData.status === 404) {
        console.log("Không tìm thấy bounding box");
        setStreetInputType("text");
        setGetStreetsLoading(false);
        setStreets([]);
      } else {
        try {
          const overpassUrl = process.env
            .NEXT_PUBLIC_GET_STREET_LIST_BASE_API as string;
          const query = `
        [out:json];
        (
          way["highway"](${boundingBoxData[0]},${boundingBoxData[2]},${boundingBoxData[1]},${boundingBoxData[3]});
        );
        out body;
        >;
        out skel qt;`;

          // Fetch data from Overpass API
          const response = await fetch(overpassUrl, {
            method: "POST",
            body: query,
          });

          const json = await response.json();

          if (!response.ok) {
            setStreetInputType("text");
            console.error("Error fetching data:", json.error);
          }

          const filteredStreets = [
            ...new Set(
              json.elements
                .filter((e: any) => e.tags?.name !== undefined)
                .map((e: any) => e.tags.name.trim())
            ),
          ];

          if (filteredStreets.length > 0) {
            setStreetInputType("select");
            setStreets(filteredStreets as string[]);
          }
          setGetStreetsLoading(false);
        } catch (error) {
          setStreetInputType("text");
          console.error("Error fetching data:", error);
        }
      }
    } catch (error) {
      console.log("Lấy bounding box của phường/xã không thành công.");
      setStreetInputType("text");
    }
  };
  useEffect(() => {
    getStreets();
  }, [choseWard]);

  // Formatted Currency
  const [enteredAmount, setEnteredAmount] = useState<number>(
    formValue?.price || 0
  );

  // Set Default Values
  useEffect(() => {
    if (session && session?.user) {
      form.setValue("name", session.user.name);
      form.setValue("tel", session.user.tel);
    }
  }, [session]);

  useEffect(() => {
    if (formValue) {
      form.setValue("area", formValue.area.toString());
      form.setValue("category", formValue.category_id.toString());
      form.setValue("main_content", formValue.main_content);
      form.setValue("maps_embed_link", formValue.maps_embed_link);
      form.setValue("title", formValue.title);
      form.setValue("tenant_type", formValue.tenant_type);
      form.setValue("price", formValue.price);
      form.setValue("province", formValue.province_code);
      form.setValue("district", formValue.district_code);
    }

    if (notSubmitValue) {
      form.setValue("address_number", notSubmitValue.address_number);
      form.setValue("ward", notSubmitValue.ward_code);
      form.setValue("street", notSubmitValue.street);
    }
  }, [formValue, notSubmitValue]);

  // Submit Form
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setFormValue({
      address: fullAddress,
      title: data.title,
      main_content: data.main_content,
      price: Number(data.price),
      area: parseFloat(data.area),
      tenant_type: data.tenant_type as any,
      province_code: data.province,
      district_code: data.district,
      category_id: Number(data.category),
      days: 0,
      has_badge: false,
      package_type: PackageType.Free,
      maps_embed_link: data.maps_embed_link,
    });
    setNotSubmitValue({
      address_number: data.address_number,
      street: data.street,
      ward_code: data.ward,
      filteredDistricts,
      filteredWards,
      filterStreets: streets || [],
      streetInputType: streetInputType as "text" | "select",
    });
    if (data?.images?.length) {
      setMediaFormValue((prev) => ({
        images: data.images || [],
        videos: prev.videos || [],
      }));
    }
    if (data?.videos?.length) {
      setMediaFormValue((prev) => ({
        images: prev.images || [],
        videos: data.videos || [],
      }));
    }
    setShowedContent("checkout");
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Địa chỉ cho thuê</h2>
      <div className="flex gap-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-[60%]"
          >
            <div className="grid grid-cols-3 gap-4">
              {/* Province */}
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tỉnh/Thành phố</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={
                        formValue?.province_code ? formValue?.province_code : ""
                      }
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn Tỉnh/Thành phố" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {provinces?.map((province) => (
                          <SelectItem value={province.code} key={province.code}>
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

              {/* District */}
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quận/Huyện</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={
                        formValue?.district_code ? formValue?.district_code : ""
                      }
                      disabled={!choseProvince}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn Quận/Huyện" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filteredDistricts.map((district) => (
                          <SelectItem value={district.code} key={district.code}>
                            {district.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.district ? (
                      <FormMessage />
                    ) : (
                      <FormDescription>
                        Vui lòng chọn Quận/Huyện
                      </FormDescription>
                    )}
                  </FormItem>
                )}
              />

              {/* Ward */}
              <FormField
                control={form.control}
                name="ward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phường/Xã</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={
                        notSubmitValue?.ward_code
                          ? notSubmitValue?.ward_code
                          : ""
                      }
                      disabled={!choseDistrict}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn Phường/Xã" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filteredWards.map((ward) => (
                          <SelectItem value={ward.code} key={ward.code}>
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

              {/* Street */}
              {streetInputType === "text" ? (
                // Text input
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Đường/Phố</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập Đường/Phố"
                          disabled={getStreetsLoading}
                          defaultValue={notSubmitValue?.street || ""}
                          {...field}
                        />
                      </FormControl>
                      {errors.street ? (
                        <FormMessage />
                      ) : (
                        <FormDescription>
                          Vui lòng nhập Đường/Phố
                        </FormDescription>
                      )}
                    </FormItem>
                  )}
                />
              ) : (
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Đường/Phố</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={
                          notSubmitValue?.street ? notSubmitValue?.street : ""
                        }
                        disabled={getStreetsLoading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn Đường/Phố" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {streets.map((street: string) => (
                            <SelectItem value={street} key={street}>
                              {street}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.ward ? (
                        <FormMessage />
                      ) : (
                        <FormDescription>
                          Vui lòng chọn Đường/Phố
                        </FormDescription>
                      )}
                    </FormItem>
                  )}
                />
              )}

              {/* Address Number */}
              <FormField
                control={form.control}
                name="address_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số nhà</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập số nhà"
                        {...field}
                        type="number"
                        defaultValue={notSubmitValue?.address_number || ""}
                      />
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

            {/* Full Address */}
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

            <h2 className="text-2xl font-bold">Thông tin mô tả</h2>
            <div className="grid grid-cols-3 gap-4 !mt-4">
              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại chuyên mục</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={formValue?.category_id.toString() || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại chuyên mục" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Phòng trọ, nhà trọ</SelectItem>
                        <SelectItem value="2">Nhà thuê nguyên căn</SelectItem>
                        <SelectGroup>
                          <SelectLabel>Căn hộ</SelectLabel>
                          <SelectItem value="3" className="pl-12">
                            Cho thuê căn hộ
                          </SelectItem>
                          <SelectItem value="4" className="pl-12">
                            Cho thuê căn hộ dịch vụ
                          </SelectItem>
                          <SelectItem value="5" className="pl-12">
                            Cho thuê căn hộ mini
                          </SelectItem>
                        </SelectGroup>
                        <SelectItem value="6">Tìm người ở ghép</SelectItem>
                        <SelectItem value="7">
                          Cho thuê mặt bằng, văn phòng
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.category ? (
                      <FormMessage />
                    ) : (
                      <FormDescription>
                        Vui lòng chọn loại chuyên mục
                      </FormDescription>
                    )}
                  </FormItem>
                )}
              />

              {/* Title */}
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tiêu đề</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập tiêu đề" {...field} />
                      </FormControl>
                      {errors.title ? (
                        <FormMessage />
                      ) : (
                        <FormDescription>Vui lòng nhập tiêu đề</FormDescription>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              {/* Map URL */}
              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name="maps_embed_link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link Google Maps</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập link Google Maps" {...field} />
                      </FormControl>
                      {errors.address_number ? (
                        <FormMessage />
                      ) : (
                        <FormDescription>
                          Vui lòng nhập link Google Maps
                        </FormDescription>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              {/* Main content */}
              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name="main_content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nội dung mô tả</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nhập nội dung mô tả"
                          className="resize-none"
                          rows={8}
                          {...field}
                        />
                      </FormControl>
                      {errors.address_number ? (
                        <FormMessage />
                      ) : (
                        <FormDescription>
                          Vui lòng nhập nội dung mô tả
                        </FormDescription>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thông tin liên hệ</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Cập nhật tên để thay đổi"
                        {...field}
                        disabled
                      />
                    </FormControl>
                    <FormDescription>Cập nhật tên để thay đổi</FormDescription>
                  </FormItem>
                )}
              />

              {/* Phone number */}
              <FormField
                control={form.control}
                name="tel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Cập nhật SĐT để thay đổi"
                        {...field}
                        disabled
                      />
                    </FormControl>
                    <FormDescription>Cập nhật SĐT để thay đổi</FormDescription>
                  </FormItem>
                )}
              />

              {/* Tenant Type */}
              <FormField
                control={form.control}
                name="tenant_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Đối tượng cho thuê</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={formValue?.tenant_type || TentnantType.All}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn đối tượng cho thuê" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={TentnantType.All}>Tất cả</SelectItem>
                        <SelectItem value={TentnantType.Male}>Nam</SelectItem>
                        <SelectItem value={TentnantType.Female}>Nữ</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.ward ? (
                      <FormMessage />
                    ) : (
                      <FormDescription>
                        Vui lòng chọn loại chuyên mục
                      </FormDescription>
                    )}
                  </FormItem>
                )}
              />

              <div className="col-span-2">
                {/* Price */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giá cho thuê (Đồng/tháng)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập số tiền phải trả trong 1 tháng"
                          type="text"
                          {...field}
                          value={enteredAmount.toLocaleString("en-US", {
                            style: "decimal",
                            maximumFractionDigits: 0,
                          })}
                          onChange={(e) => {
                            const numeralValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            const formattedValue = parseInt(numeralValue) || 0;
                            form.setValue("price", formattedValue);
                            setEnteredAmount(formattedValue);
                          }}
                        />
                      </FormControl>
                      {errors.price ? (
                        <FormMessage />
                      ) : (
                        <FormDescription>
                          Nhập số tiền phải trả trong 1 tháng
                        </FormDescription>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2">
                {/* Area */}
                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diện tích (m²)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập diện tích theo đơn vị m²"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      {errors.area ? (
                        <FormMessage />
                      ) : (
                        <FormDescription>
                          Nhập diện tích theo đơn vị m²
                        </FormDescription>
                      )}
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <h2 className="font-bold text-2xl">Hình ảnh</h2>
            <p className="!mt-1 text-sm">
              Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn
            </p>
            <ImageDropzone setFormValue={form.setValue} />

            <h2 className="font-bold text-2xl">Video</h2>
            <p className="!mt-1 text-sm">
              Cập nhật video để người thuê có góc nhìn tổng quan
            </p>
            <VideoDropzone setFormValue={form.setValue} />

            <Button type="submit" className="w-full">
              Tiếp Tục <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Button>
          </form>
        </Form>

        <div className="flex-1 ">
          <div className="w-full aspect-square">
            {/* <AdddressMap
              location={{
                address_number: choseAddressNumber,
                street: choseStreet,
                province: initialChoseProvince?.name || "",
                district: initialChoseDistrict?.name || "",
                ward: initialChoseWard?.name || "",
              }}
            /> */}
          </div>

          <Attention />
        </div>
      </div>
    </div>
  );
};

export default NewPostForm;

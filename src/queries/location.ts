"use server";

export const getProvinces = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_LOCATION_LIST_BASE_API}/1/0.htm`
    );

    if (!res.ok) {
      console.log("Lấy dữ liệu tỉnh thành không thành công.");
    }

    return await res.json();
  } catch (error) {
    console.log("Lấy dữ liệu tỉnh thành không thành công.");
  }
};

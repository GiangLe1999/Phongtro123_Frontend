import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const url = await request.json();
    console.log(url);
    const boundingBoxRes = await fetch(url);

    if (!boundingBoxRes.ok) {
      console.log("Lấy bounding box của phường/xã không thành công.");
    }

    const data = await boundingBoxRes.json();

    const suburb = data.find((i: any) => i.addresstype === "suburb");

    if (suburb) {
      return NextResponse.json(suburb.boundingbox);
    }

    return NextResponse.json(
      { status: 404, message: "Không tìm thấy bounding box" },
      { status: 404 }
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      { message: "Lấy bounding box của phường/xã không thành công" },
      { status: 500 }
    );
  }
}

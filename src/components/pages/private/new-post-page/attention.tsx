import { FC } from "react";

interface Props {}

const Attention: FC<Props> = (props): JSX.Element => {
  return (
    <div className="bg-[#FFF9E6] rounded-sm p-4 mt-6 mb-5 shadow-md text-sm">
      <h2 className="font-bold text-xl mb-2">Lưu ý khi đăng tin:</h2>
      <ul className="text-sm list-disc space-y-2 list-inside marker:text-muted-foreground">
        <li>Nội dung phải viết bằng tiếng Việt có dấu.</li>
        <li>
          Tiêu đề tin không dài quá 100 kí tự Các bạn nên điền đầy đủ thông tin
          vào các mục để tin đăng có hiệu quả hơn.
        </li>
        <li>
          Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn, hãy sửa
          vị trí tin rao của bạn trên bản đồ bằng cách kéo icon tới đúng vị trí
          của tin rao.
        </li>
        <li>
          Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều lần so với
          tin rao không có ảnh.
        </li>
        <li>Hãy đăng ảnh để được giao dịch nhanh chóng!</li>
      </ul>
    </div>
  );
};

export default Attention;

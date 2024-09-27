export const pageLinks = {
  home: "/",
  login: "/dang-nhap-tai-khoan",
  register: "/dang-ky-tai-khoan",
  verify: "/xac-thuc-tai-khoan",
  forgot_password: "/quen-mat-khau",
  bookmarks: "/tin-da-luu",
  room_postings: "/cho-thue-phong-tro",
  home_postings: "/nha-cho-thue",
  apartment_postings: "/cho-thue-can-ho",
  ground_postings: "/cho-thue-mat-bang",
  search_partners: "/tim-nguoi-o-ghep",
  news: "/blog",
  pricing: "/bang-gia-dich-vu",

  dashboard: "/quan-ly",
  post: "/quan-ly/dang-tin-moi",
  manage_posts: "/quan-ly/tin-dang",
  payment: "quan-ly/nap-tien",
  payment_history: "quan-ly/lich-su-nap-tien",
  user_profile: "quan-ly/cap-nhat-thong-tin-ca-nhan",
};

export const regexes = {
  name: /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮựụủứừửữỰỲỴÝỶỸỳỵỷỹ\s]+$/,
  tel: /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/g,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,50}$/,
};

export const siteMetadata = {
  tel: "0962334807",
};

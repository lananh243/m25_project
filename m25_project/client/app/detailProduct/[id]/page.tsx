"use client";
import {
  faAngleDown,
  faEnvelope,
  faHeart,
  faHouse,
  faPhone,
  faSearch,
  faShoppingBag,
  faStar,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../service/product.service";
export default function page() {
  const dispatch = useDispatch();
  const route = useRouter();
  const [user, setUser] = useState<any>([]);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const handleMouseEnter = () => {
    setIsMenuVisible(true);
  };
  const handleMouseLeave = () => {
    setIsMenuVisible(false);
  };
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      route.push("/login");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [route]);
  const handleRegister = () => {
    route.push("/register");
  };
  const handleLogin = () => {
    route.push("/login");
  };
  const pathName = usePathname();
  const id = pathName.split("/").pop();
  const product: any = useSelector(
    (state: any) => state.productReducer.productDetail
  );

  useEffect(() => {
    if (id) {
      dispatch(getProductById(Number(id)));
    }
  }, [dispatch, id]);

  const handleCart = () => {
    route.push("/cart");
  };
  return (
    <>
      <div className="h-40 bg-rose-800 flex justify-around">
        <div className="flex items-center gap-14">
          <div className="flex items-center gap-12">
            <div>
              <img
                src="https://theme.hstatic.net/1000313040/1000406925/14/logo.png?v=2130"
                alt=""
              />
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-64 h-9 p-3"
              />
              <button className="w-9 h-9 bg-rose-950 flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="w-4 h-4 text-white"
                ></FontAwesomeIcon>
              </button>
            </div>
          </div>
          <div>
            <div className="flex gap-14">
              <div className="flex items-center gap-4">
                <button className="h-10 w-10 bg-white flex justify-center items-center rounded-full">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="w-5 h-5"
                  ></FontAwesomeIcon>
                </button>
                <span className="text-white">0961 452 578</span>
              </div>
              <div className="flex items-center gap-4">
                <button className="h-10 w-10 bg-white flex justify-center items-center rounded-full">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="w-5 h-5"
                  ></FontAwesomeIcon>
                </button>
                <span className="text-white">0</span>
              </div>
              {user && (
                <div
                  className="relative flex items-center gap-4"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="h-10 w-10 bg-white flex justify-center items-center rounded-full">
                    <FontAwesomeIcon icon={faUserTie} className="w-5 h-5" />
                  </button>
                  <span className="text-white">{user.name}</span>
                  {isMenuVisible && (
                    <div className="absolute top-12 left-0 bg-white text-black rounded-lg shadow-lg w-32">
                      <div className="absolute -top-2 left-4 w-4 h-4 bg-white transform rotate-45"></div>
                      <div className="flex flex-col py-2 px-4">
                        {user ? (
                          <button className="text-sm py-1 px-2 hover:bg-gray-200 cursor-pointer rounded-md text-left">
                            Đăng xuất
                          </button>
                        ) : (
                          // Nếu chưa đăng nhập, hiển thị các nút "Đăng nhập" và "Đăng ký"
                          <>
                            <button
                              className="text-sm py-1 px-2 hover:bg-gray-200 cursor-pointer rounded-md text-left"
                              onClick={handleLogin}
                            >
                              Đăng nhập
                            </button>
                            <button
                              className="text-sm py-1 px-2 hover:bg-gray-200 cursor-pointer rounded-md text-left mt-1"
                              onClick={handleRegister}
                            >
                              Đăng ký
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center gap-4">
                <button
                  className="h-10 w-10 bg-white flex justify-center items-center rounded-full"
                  onClick={handleCart}
                >
                  <FontAwesomeIcon
                    icon={faShoppingBag}
                    className="w-5 h-5"
                  ></FontAwesomeIcon>
                </button>
                <span className="text-white">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-12 bg-rose-800 flex items-center gap-6 px-36">
        <div className="text-sm font-bold">TRANG CHỦ</div>
        <div className="flex items-center text-sm font-bold gap-2">
          BÁNH SINH NHẬT
          <span>
            <FontAwesomeIcon
              icon={faAngleDown}
              className="w-4 h-4"
            ></FontAwesomeIcon>
          </span>
        </div>
        <div className="flex items-center text-sm font-bold gap-2">
          BÁNH MÌ & BÁNH MẶN
          <span>
            <FontAwesomeIcon
              icon={faAngleDown}
              className="w-4 h-4"
            ></FontAwesomeIcon>
          </span>
        </div>
        <div className="flex items-center text-sm font-bold gap-2">
          COOKIES & MINICAKE
          <span>
            <FontAwesomeIcon
              icon={faAngleDown}
              className="w-4 h-4"
            ></FontAwesomeIcon>
          </span>
        </div>
        <div className="text-sm font-bold">TIN TỨC</div>
        <div className="text-sm font-bold">KHUYẾN MẠI</div>
      </div>
      <div className="relative w-full h-80">
        <img
          src={product.image}
          alt="Sharp Image"
          className="w-full h-full object-cover"
        />
        <img
          src="https://congstudio.vn/wp-content/uploads/2022/04/Chup-anh-trung-thu-dep-uy-tin-chuyen-nghiep-22.jpg"
          alt="Blurred Image"
          className="absolute top-0 left-0 w-full h-full object-cover blur-md opacity-50"
        />
        <div className="absolute inset-0 flex justify-center items-center">
          <h1 className="text-white text-4xl font-bold">
            {product.nameProduct}
          </h1>
        </div>
      </div>

      <div className="flex justify-center my-32 gap-10 ">
        <div className="w-80 h-80 shadow-sm flex items-center justify-center rounded-xl bg-white">
          <img src={product.image} alt="" className="w-72 h-72 rounded-xl" />
        </div>

        <div className="w-3/5 rounded-xl p-7 h-1/2 shadow-sm bg-white">
          <b className="text-xl font-bold">{product.nameProduct}</b>
          <div className="flex gap-3">
            <p>4.9</p>
            <div>
              <FontAwesomeIcon
                icon={faStar}
                className="text-yellow-400"
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faStar}
                className="text-yellow-400"
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faStar}
                className="text-yellow-400"
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                icon={faStar}
                className="text-yellow-400"
              ></FontAwesomeIcon>
              <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            </div>
          </div>
          <p className="py-6">
            Mã sản phẩm : <b>{product.code}</b>
          </p>
          <hr />
          <p className="py-8">
            Giá : <b>{product.price}</b>
          </p>
          <div className="flex gap-5">
            <div>Số Lượng</div>
            <div className="flex gap-2">
              <button className="w-8 h-8 bg-red-300 text-xl rounded">-</button>
              <button className="w-8 h-8 bg-red-700 text-xl rounded">1</button>
              <button className="w-8 h-8 bg-red-900 text-xl rounded">+</button>
            </div>
          </div>
          <div className="my-8 flex gap-9">
            <button className="bg-rose-800 h-9 w-44 text-white rounded-xl">
              Thêm vào Giỏ hàng
            </button>
            <button className="bg-orange-400 h-9 w-24 text-white rounded-xl">
              Mua hàng
            </button>
          </div>
          <hr />
          <div className="flex items-center gap-24 my-7">
            <div className="flex gap-5 items-center">
              <img
                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/2bcf834c40468ebcb90b.svg"
                alt=""
              />
              <span className="whitespace-nowrap text-red-400">
                Đổi miễn phí 15 ngày
              </span>
            </div>
            <div className="flex gap-5 items-center">
              <img
                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/511aca04cc3ba9234ab0.png"
                alt=""
                className="w-8 h-8"
              />
              <span className="whitespace-nowrap text-red-400">
                Hàng chính hãng 100%
              </span>
            </div>
            <div className="flex gap-5 items-center">
              <img
                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/16ead7e0a68c3cff9f32.png"
                alt=""
                className="w-8 h-8"
              />
              <span className="whitespace-nowrap text-red-400">
                Miễn phí vận chuyển
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full">
        <div>
          <img
            src="https://adminvov1.vov.gov.vn/UploadImages/vov1/2022/thang_8/42.jpg?w=1000"
            alt="Sharp Image"
            className="w-full h-full object-cover"
          />
          <img
            src="https://congstudio.vn/wp-content/uploads/2022/04/Chup-anh-trung-thu-dep-uy-tin-chuyen-nghiep-22.jpg"
            alt="Blurred Image"
            className="absolute top-0 left-0 w-full h-full object-cover blur-md opacity-50"
          />
          <div className="absolute top-0 left-0 w-full">
            <div className="flex p-28 gap-5">
              <div>
                <img
                  src="https://theme.hstatic.net/1000313040/1000406925/14/logo_ft.png?v=2130"
                  alt="Logo"
                  className="z-10"
                />
                <br />
                <br />
                <br />
                <div className="text-lg text-white flex justify-center">
                  <div>
                    <div className="flex gap-3">
                      <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>{" "}
                      <span>
                        Số 09 Trần Thái Tông, P. Dịch Vọng,
                        <br /> Q. Cầu Giấy, TP. Hà Nội
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>{" "}
                      <span>0399847889</span>
                    </div>
                    <div className="flex gap-3">
                      <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>{" "}
                      <span>lananhbakery@gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">CHÍNH SÁCH</p>

                <div className="my-10 text-white text-lg whitespace-nowrap">
                  <p>Chính sách và quy định chung</p>
                  <p>Chính sách giao dịch , thanh toán</p>
                  <p>Chính sách đổi trả</p>
                  <p>Chính sách bảo mật</p>
                  <p>Chính sách vận chuyển</p>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-white whitespace-nowrap">
                  CÔNG TY CỔ PHẦN BÁNH NGỌT
                </p>
                <div className="my-10 text-lg text-white">
                  <p>Địa chỉ tên miền : lananhbarkery.vn</p>
                  <p>Tên miền phụ : banhngọtphap.vn</p>
                  <p>
                    Tên doanh nghiệp : Công ty cổ phần <br /> Bánh ngọt Lan Anh
                  </p>
                  <p>MST/ĐKKD/QLTL : 0104802706</p>
                  <p className="whitespace-nowrap">
                    Trụ sở Doanh Nghiệp : Số 09 Trần Thái Tông , <br /> P.Dịch
                    Vọng, Q.Cầu Giấy, TP.Hà Nội
                  </p>
                  <p>Quốc gia : Việt Nam</p>
                  <p>Điện thoại : 0293798789</p>
                  <p>Ngày cấp : 21/09/2010</p>
                  <p>Nơi cấp : Sở kế hoạch và Đầu tư Tp.Hà Nội</p>
                  <br />
                  <input
                    type="text"
                    className="border-0 border-b border-black bg-transparent focus:outline-none focus:ring-0 p-0"
                    placeholder="Nhập email của bạn ..."
                  />
                  <br />
                  <br />
                  <div className="flex gap-3">
                    <i className="fa-brands fa-facebook"></i>
                    <i className="fa-brands fa-twitter"></i>
                    <i className="fa-brands fa-instagram"></i>
                    <i className="fa-brands fa-google-plus-g"></i>
                    <i className="fa-brands fa-square-youtube"></i>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xl text-white font-bold whitespace-nowrap">
                  MỖI THÁNG CHÚNG TÔI ĐỀU CÓ <br />
                  NHỮNG ĐỢT GIẢM GIÁ DỊCH VỤ VÀ <br />
                  SẢN PHẨM NHẰM TRI ÂN KHÁCH <br />
                  HÀNG . ĐỂ CÓ THỂ CẬP NHẬT KỊP <br />
                  THỜI NHỮNG ĐỢT GIẢM GIÁ NÀY , VUI <br />
                  LÒNG NHẬP ĐỊA CHỈ EMAIL CỦA BẠN <br />
                  VÀO Ô DƯỚI ĐÂY
                </p>
                <img
                  src="https://theme.hstatic.net/1000313040/1000406925/14/hg_img_thumb1.png?v=2130"
                  alt=""
                  className="w-64"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-rose-800 h-14 flex items-center">
        <p className="m-40 text-white">Copyrights © 2018 by Lananh Bakery.</p>
      </div>
    </>
  );
}

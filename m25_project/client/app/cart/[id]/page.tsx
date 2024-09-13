"use client";
import { getCartProductById } from "@/app/service/cart.service";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function page() {
  let userData = JSON.parse(localStorage.getItem("user") || "[]");
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cartReducer.carts);
  console.log(cart);
  useEffect(() => {
    if (userData.id) {
      dispatch(getCartProductById(userData.id));
      dispatch(getCartProductById(userData.id));
    }
  }, [dispatch, userData.id]);
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
  const handleCart = () => {
    route.push("/cart");
  };
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsAllChecked(checked);
    setCheckedItems(
      checked ? new Set(cart.map((_, index: any) => index)) : new Set()
    );
  };

  const handleCheckboxChange = (index: number) => {
    const newCheckedItems = new Set(checkedItems);
    if (newCheckedItems.has(index)) {
      newCheckedItems.delete(index);
    } else {
      newCheckedItems.add(index);
    }
    setCheckedItems(newCheckedItems);
    setIsAllChecked(newCheckedItems.size === cart.length);
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
                <span className="text-white">{cart.length}</span>
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
          src="https://www.banhngoncaocap.com/images/10-dia-chi-ban-banh-trung-thu-nha-lam-vua-ngon-vua-dep-bat-kip-xu-huong-banh-handmade-cho-trung-thu-nam-nay-3.jpg"
          alt="Sharp Image"
          className="w-full h-full object-cover"
        />
        <img
          src="https://congstudio.vn/wp-content/uploads/2022/04/Chup-anh-trung-thu-dep-uy-tin-chuyen-nghiep-22.jpg"
          alt="Blurred Image"
          className="absolute top-0 left-0 w-full h-full object-cover blur-md opacity-50"
        />
        <div className="absolute inset-0 flex justify-center items-center">
          <h1 className="text-white text-4xl font-bold">GIỎ HÀNG</h1>
        </div>
      </div>

      <div className=" my-32 gap-10 ">
        <div className=" w-10/12 m-auto">
          <table className="w-full text-center">
            <thead>
              <tr>
                <th className="p-10">
                  <input
                    type="checkbox"
                    checked={isAllChecked}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="text-xl">STT</th>
                <th className="text-xl">Tên sản phẩm</th>
                <th className="text-xl">Ảnh sản phẩm</th>
                <th className="text-xl">Số lượng</th>
                <th className="text-xl">Tổng giá</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item: any, index: number) => (
                <tr className="border-t-2 border-solid border-gray-300">
                  <td className="p-10">
                    <input
                      type="checkbox"
                      checked={checkedItems.has(index)}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                  <td className="text-xl">{index + 1}</td>
                  <td className="text-xl">{item.products.nameProduct}</td>
                  <td className="flex justify-center items-center p-5">
                    <img
                      src={item.products.image}
                      alt=""
                      className="w-48 h-48 rounded"
                    />
                  </td>
                  <td>
                    <div className="flex justify-center gap-3">
                      <button className="w-7 h-7 bg-red-400 rounded text-2xl text-white flex justify-center items-center">
                        -
                      </button>
                      <span className="text-xl">{item.products.quantity}</span>
                      <button className="w-7 h-7 bg-red-400 rounded text-2xl text-white flex justify-center items-center">
                        +
                      </button>
                    </div>
                  </td>
                  <td className="text-xl">{item.products.price}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-solid border-gray-300">
                <td className="p-10">Xóa () sản phẩm</td>
                <td
                  colSpan={5}
                  className="text-right pr-5 text-xl font-extrabold"
                >
                  Tổng tiền : <span>2333 ₫</span>
                </td>{" "}
              </tr>
              <tr>
                <td colSpan={6} className="text-right px-4">
                  <button className="bg-red-400 h-8 w-36 rounded text-lg text-white">
                    Xóa sản phẩm
                  </button>
                  <button className="w-32 h-8 bg-blue-400 text-lg rounded text-white ml-8">
                    Thanh toán
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
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

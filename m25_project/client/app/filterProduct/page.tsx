"use client";
import {
  addToCart,
  getCartProductById,
  updateCart,
} from "@/app/service/cart.service";
import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faEnvelope,
  faHeart,
  faHouse,
  faPhone,
  faSearch,
  faShoppingBag,
  faShoppingCart,
  faStar,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterProductsByPriceRange,
  getAllProduct,
  searchNameProduct,
  sortProduct,
  sortProductByPrice,
} from "../service/product.service";
import { getAllCategory } from "../service/category.service";
import { AppDispatch } from "../store/store";
export default function page() {
  let userData = JSON.parse(localStorage.getItem("user") || "[]");
  const dispatch = useDispatch<AppDispatch>();
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
  const handleDetail = (id: number) => {
    route.push(`/detailProduct/${id}`);
  };
  const handleAddToCart = async (product: any) => {
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn thêm sản phẩm vào giỏ hàng ko ??"
    );
    if (confirmed) {
      const existProduct = cart.find(
        (item: any) => item.products.id === product.id
      );
      if (existProduct) {
        const updatedProduct = {
          ...existProduct,
          products: {
            ...existProduct,
            quantity: existProduct.products.quantity + 1,
          },
        };
        await dispatch(updateCart(updatedProduct));
      } else {
        const newCart = {
          idUser: userData.id,
          products: {
            nameProduct: product.nameProduct,
            price: product.price,
            image: product.image,
            code: product.code,
            categoryId: product.categoryId,
            quantity: 1,
            id: product.id,
          },
        };
        await dispatch(addToCart(newCart));
      }
    }
  };
  //   Lấy sản phẩm ra
  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllCategory());
  }, [dispatch]);
  const productData = useSelector(
    (state: any) => state.productReducer.products
  );
  //   Tìm kiếm sản phẩm
  const [searchName, setSearchName] = useState("");
  const handleSearchName = () => {
    console.log("1111111111", searchName);

    dispatch(searchNameProduct(searchName));
  };
  // Sắp xếp
  const [sortName, setSortName] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const handleSortName = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value;
    dispatch(sortProduct(order));
  };

  const handleSortPrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value;
    setSortPrice(order);
    dispatch(sortProductByPrice(order)); // Correctly typed dispatch
  };

  // Phân trang

  // Danh mục
  const categoryData = useSelector(
    (state: any) => state.categoryReducer.categorys
  );
  // const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const category = +e.target.value;
  //   setSelectedCategory(category);
  //   dispatch(filterProductsByCategory(category));
  // };
  // lọc giá

  // lọc sản phẩm
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // Lọc sản phẩm dựa trên selectedCategory
  const filteredProducts = productData.filter((product: any) => {
    return selectedCategory
      ? product.categoryId === Number(selectedCategory)
      : true;
  });
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const handleFilter = () => {
    dispatch(filterProductsByPriceRange({ minPrice, maxPrice }));
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
          <h1 className="text-white text-4xl font-bold">BÁNH TRUNG THU 2024</h1>
        </div>
      </div>
      <div className="flex my-28 justify-evenly">
        <div className="w-72">
          <div>
            <select
              name=""
              id=""
              className="w-64 h-9 rounded"
              value={sortPrice}
              onChange={handleSortPrice}
            >
              <option value="">Lọc theo giá</option>
              <option value="asc">Từ thấp -&gt; cao</option>
              <option value="desc">Từ cao -&gt; thấp</option>
            </select>
          </div>
          <br />
          <div>
            <input
              className="w-64"
              type="range"
              min={100000}
              max={500000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(+e.target.value)}
            />
            <div className="w-64 justify-between flex">
              <div>Giá trị : {maxPrice}</div>
              <button
                className="bg-blue-400 w-11 text-white rounded h-7"
                onClick={handleFilter}
              >
                Lọc
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-end w-3/5 gap-8">
          <div className="w-64 rounded">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full h-9 pl-3 pr-10 border rounded"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
                onClick={handleSearchName}
              />
            </div>
          </div>
          <div>
            <select
              name=""
              id=""
              className="h-9 w-64 rounded"
              value={sortName}
              onChange={handleSortName}
            >
              <option value="">Sắp xếp sản phẩm</option>
              <option value="asc">A -&gt; Z</option>
              <option value="desc">Z -&gt; A</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex justify-evenly">
        <div className="w-72 h-96 rounded bg-rose-800 p-12">
          <div>
            <p className="text-2xl whitespace-nowrap">DANH MỤC MENU</p>
            <div className="py-8">
              {/* Hiển thị nút cho từng danh mục */}
              <p
                onClick={() => setSelectedCategory(null)}
                className={`py-2 w-56 cursor-pointer ${
                  !selectedCategory ? "bg-blue-400 text-white" : ""
                }`}
              >
                Tất cả danh mục
              </p>
              {categoryData.map((category: any) => (
                <p
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id.toString())}
                  className={` py-2 w-56 cursor-pointer ${
                    selectedCategory === category.id.toString()
                      ? "bg-blue-400 text-white"
                      : ""
                  }`}
                >
                  {category.name}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="w-8/12">
          <div className="flex flex-wrap max-w-screen-xl mx-auto gap-10">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product: any) => {
                return (
                  <div
                    className="w-72 overflow-hidden rounded-xl shadow-lg mb-12 bg-white"
                    key={product.id}
                  >
                    <img
                      src={product.image}
                      alt=""
                      className="hover:scale-105 transition-transform duration-300"
                    />
                    <div className="py-6">
                      <h1
                        onClick={() => handleDetail(product.id)}
                        className="text-xl font-bold text-center hover:text-gray-500 cursor-pointer"
                      >
                        {product.nameProduct}
                      </h1>
                      <p className="text-center">{product.code}</p>
                    </div>
                    <div className="flex w-64 justify-between">
                      <div className="flex ">
                        <button className="bg-yellow-600 w-32 h-10 font-bold text-white">
                          {product.price}
                        </button>
                        <button
                          className="h-10 w-10 bg-rose-800 flex justify-center items-center"
                          onClick={() => handleAddToCart(product)}
                        >
                          <FontAwesomeIcon
                            icon={faShoppingCart}
                            className=" h-5 w-5 text-white"
                          ></FontAwesomeIcon>
                        </button>
                      </div>
                      <button>
                        <FontAwesomeIcon
                          icon={faHeart}
                          className="text-2xl text-red-700"
                        ></FontAwesomeIcon>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Không có sản phẩm nào trong danh mục này.</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-evenly my-14">
        <div className="w-72"></div>
        <div className="w-8/12">
          <div className="flex justify-center gap-5">
            <button className="w-8 h-8 bg-rose-800 rounded text-white">
              <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
            </button>
            <button className="w-8 h-8 bg-rose-800 rounded text-white">
              1
            </button>
            <button className="w-8 h-8 bg-rose-800 rounded text-white">
              2
            </button>
            <button className="w-8 h-8 bg-rose-800 rounded text-white">
              3
            </button>
            <button className="w-8 h-8 bg-rose-800 rounded text-white">
              <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
            </button>
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

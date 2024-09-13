"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faHouse,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Autoplay } from "swiper/modules";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../service/product.service";
import { Button, Modal } from "react-bootstrap";
import {
  addToCart,
  getCartProductById,
  updateCart,
} from "../service/cart.service";

export default function Home() {
  const dispatch = useDispatch();
  const { id } = useParams();
  let userData = JSON.parse(localStorage.getItem("user") || "[]");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const route = useRouter();
  const handleMouseEnter = () => {
    setIsMenuVisible(true);
  };
  const handleMouseLeave = () => {
    setIsMenuVisible(false);
  };
  const handleRegister = () => {
    route.push("/register");
  };
  const handleLogin = () => {
    route.push("/login");
  };
  const [user, setUser] = useState<any>([]);
  useEffect(() => {
    if (!userData) {
      route.push("/login");
    } else {
      setUser(userData);
    }
  }, [route]);
  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  const productData: any = useSelector(
    (state: any) => state.productReducer.products
  );
  const product = productData.find((pro: any) => pro.id == id);
  console.log(productData);
  // Chi tiết sản phẩm
  const handleDetail = (id: number) => {
    route.push(`/detailProduct/${id}`);
  };

  // Cho vào giỏ hàng
  const cart: any = useSelector((state: any) => state.cartReducer.carts);
  console.log(cart);
  useEffect(() => {
    if (userData.id) {
      dispatch(getCartProductById(userData.id));
    }
  }, [dispatch, userData.id]);
  // cart
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
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleCart = (id: number) => {
    route.push(`/cart/${id}`);
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
                          // Nếu đã đăng nhập, hiển thị nút "Đăng xuất"
                          <button className="text-sm py-1 px-2 hover:bg-gray-200 cursor-pointer rounded-md text-left">
                            Đăng xuất
                          </button>
                        ) : (
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
                  onClick={() => handleCart(userData.id)}
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
      <div>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            <img
              src="https://theme.hstatic.net/1000313040/1000406925/14/ms_banner_img1.jpg?v=2130"
              alt="Slide 1"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://theme.hstatic.net/1000313040/1000406925/14/ms_banner_img2.jpg?v=2130"
              alt="Slide 2"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://theme.hstatic.net/1000313040/1000406925/14/ms_banner_img3.jpg?v=2130"
              alt="Slide 3"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://theme.hstatic.net/1000313040/1000406925/14/ms_banner_img4.jpg?v=2130"
              alt="Slide 4"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://theme.hstatic.net/1000313040/1000406925/14/ms_banner_img5.jpg?v=2130"
              alt="Slide 5"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="my-24">
        <h1 className="text-4xl font-bold text-yellow-500 text-center">
          BÁNH TRUNG THU
        </h1>
        <img
          src="https://theme.hstatic.net/1000313040/1000406925/14/home_line_collection1.png?v=2130"
          alt=""
          className="m-auto my-2"
        />
      </div>
      <div className="flex flex-wrap justify-evenly max-w-screen-xl mx-auto gap-10">
        {productData.map((product: any) => {
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
        })}
      </div>

      <div className="justify-center flex">
        <button className="w-32 h-10 bg-rose-900 rounded-xl font-bold text-white">
          XEM THÊM
        </button>
      </div>

      <div className="my-24">
        <h1 className="text-4xl font-bold text-yellow-500 text-center">
          GATEAUX KEM TƯƠI
        </h1>
        <img
          src="https://theme.hstatic.net/1000313040/1000406925/14/home_line_collection1.png?v=2130"
          alt=""
          className="m-auto my-2"
        />
      </div>
      <div className="flex justify-evenly my-12">
        <div className="w-72 overflow-hidden rounded-xl shadow-md">
          <img
            src="https://product.hstatic.net/1000313040/product/product_website_19_e9c104479fa343f7829e7ddb39417921_large.png"
            alt=""
            className="hover:scale-105 transition-transform duration-300"
          />
          <div className="py-6">
            <h1 className="text-xl font-bold text-center">TIRAMISU VUÔNG</h1>
            <p className="text-center">KT007</p>
          </div>
          <div className="flex w-64 justify-between">
            <div className="flex ">
              <button className="bg-yellow-600 w-32 h-10 font-bold text-white">
                325,000
              </button>
              <button className="h-10 w-10 bg-rose-800 flex justify-center items-center">
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
        <div className="w-72 overflow-hidden rounded-xl shadow-md">
          <img
            src="https://product.hstatic.net/1000313040/product/53_c2a32321b1c4417d89a727f048d06659_large.png"
            alt=""
            className="hover:scale-105 transition-transform duration-300"
          />
          <div className="py-6">
            <h1 className="text-xl font-bold text-center">FRUIT CAKE</h1>
            <p className="text-center">KT017</p>
          </div>
          <div className="flex w-64 justify-between">
            <div className="flex ">
              <button className="bg-yellow-600 w-32 h-10 font-bold text-white">
                275,000
              </button>
              <button className="h-10 w-10 bg-rose-800 flex justify-center items-center">
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
        <div className="w-72 overflow-hidden rounded-xl shadow-md">
          <img
            src="https://product.hstatic.net/1000313040/product/1__1__72ac901740aa4ae79581213a5dd3a8f9_large.png"
            alt=""
            className="hover:scale-105 transition-transform duration-300"
          />
          <div className="py-6">
            <h1 className="text-xl font-bold text-center">GREENTEA CAKE 3</h1>
            <p className="text-center">KT006</p>
          </div>
          <div className="flex w-64 justify-between">
            <div className="flex ">
              <button className="bg-yellow-600 w-32 h-10 font-bold text-white">
                223,000
              </button>
              <button className="h-10 w-10 bg-rose-800 flex justify-center items-center">
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
        <div className="w-72 overflow-hidden rounded-xl shadow-md">
          <img
            src="https://product.hstatic.net/1000313040/product/7_491649042b62455294abb5468b891337_large.png"
            alt=""
            className="hover:scale-105 transition-transform duration-300"
          />
          <div className="py-6">
            <h1 className="text-xl font-bold text-center">COCONUT CAKE</h1>
            <p className="text-center">KT014</p>
          </div>
          <div className="flex w-64 justify-between">
            <div className="flex ">
              <button className="bg-yellow-600 w-32 h-10 font-bold text-white">
                257,000
              </button>
              <button className="h-10 w-10 bg-rose-800 flex justify-center items-center">
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
      </div>
      <div className="flex justify-evenly my-12">
        <div className="w-72 overflow-hidden rounded-xl shadow-md">
          <img
            src="https://product.hstatic.net/1000313040/product/22_2106d23eac324a0f8223f62090918d18_large.png"
            alt=""
            className="hover:scale-105 transition-transform duration-300"
          />
          <div className="py-6">
            <h1 className="text-xl font-bold text-center">TIRAMISU</h1>
            <p className="text-center">KT001</p>
          </div>
          <div className="flex w-64 justify-between">
            <div className="flex ">
              <button className="bg-yellow-600 w-32 h-10 font-bold text-white">
                246,000
              </button>
              <button className="h-10 w-10 bg-rose-800 flex justify-center items-center">
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
        <div className="w-72 overflow-hidden rounded-xl shadow-md">
          <img
            src="https://product.hstatic.net/1000313040/product/product_website_30_805c4673c8eb44e7a93d6bc1abf0bb67_large.png"
            alt=""
            className="hover:scale-105 transition-transform duration-300"
          />
          <div className="py-6">
            <h1 className="text-xl font-bold text-center">FRESH FRUIT CAKE</h1>
            <p className="text-center">KT015</p>
          </div>
          <div className="flex w-64 justify-between">
            <div className="flex ">
              <button className="bg-yellow-600 w-32 h-10 font-bold text-white">
                356,000
              </button>
              <button className="h-10 w-10 bg-rose-800 flex justify-center items-center">
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
        <div className="w-72 overflow-hidden rounded-xl shadow-md">
          <img
            src="https://product.hstatic.net/1000313040/product/25_ed8d6ef7bdd84105a3864ada1a077091_large.jpg"
            alt=""
            className="hover:scale-105 transition-transform duration-300"
          />
          <div className="py-6">
            <h1 className="text-xl font-bold text-center">
              CHOCOLATE HEART CAKE
            </h1>
            <p className="text-center">BV004</p>
          </div>
          <div className="flex w-64 justify-between">
            <div className="flex ">
              <button className="bg-yellow-600 w-32 h-10 font-bold text-white">
                318,000
              </button>
              <button className="h-10 w-10 bg-rose-800 flex justify-center items-center">
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
        <div className="w-72 overflow-hidden rounded-xl shadow-md">
          <img
            src="https://product.hstatic.net/1000313040/product/2__1__5eb9e5788828456d8f78df94dc11febd_large.png"
            alt=""
            className="hover:scale-105 transition-transform duration-300"
          />
          <div className="py-6">
            <h1 className="text-xl font-bold text-center">
              GREENTEA CAKE LOVE
            </h1>
            <p className="text-center">BV007</p>
          </div>
          <div className="flex w-64 justify-between">
            <div className="flex ">
              <button className="bg-yellow-600 w-32 h-10 font-bold text-white">
                330,000
              </button>
              <button className="h-10 w-10 bg-rose-800 flex justify-center items-center">
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
      </div>
      <div className="justify-center flex">
        <button className="w-32 h-10 bg-rose-900 rounded-xl font-bold text-white">
          XEM THÊM
        </button>
      </div>
      <div className="my-24">
        <h1 className="text-4xl font-bold text-yellow-500 text-center">
          TIN TỨC NỔI BẬT
        </h1>
        <div className="flex justify-center gap-12 my-12">
          <div className="w-96 bg-white shadow-sm rounded-xl overflow-hidden">
            <img
              src="https://file.hstatic.net/1000313040/article/post_fb_trung_thu_1_ca_nhan_2a57d89f588c4b0da87ae780408f3ec6_large.png"
              alt=""
              className="w-full"
            />
            <p className="text-center p-4 text-lg font-bold">
              Ra mắt sưu tập bánh trung thu
            </p>
            <p className="w-80 m-auto text-gray-500">
              {" "}
              Một mùa trăng nữa lại về với ngào ngạt hương thơm từ muôn vàn
              chiếc bánh nướng, bánh dẻo. Những chiếc bánh tròn viên mãn, an
              lành tựa Mặt trăng, giăng đầy sự hoàn mỹ, tượng trưng cho sự Thịnh
              Vượng.
            </p>
            <br />
          </div>
          <div className="w-96 bg-white shadow-sm rounded-xl overflow-hidden">
            <img
              src="https://file.hstatic.net/1000313040/article/dsc09158_009b70157dfd404e81a77276311bf6b0_large.jpg"
              alt=""
              className="w-full"
            />
            <p className="text-center p-4 text-lg font-bold">
              TƯNG BỪNG KHAI TRƯƠNG CƠ SỞ MỚI
            </p>
            <p className="w-80 m-auto text-gray-500">
              {" "}
              Buổi khai trương của cơ sở Anh Hoà Bakery đã trở thành một ngày
              đặc biệt, ngập tràn niềm vui và hân hoan. Trong không gian trang
              trí lộng lẫy, khách hàng đến từ khắp nơi đều tận hưởng không khí
              tràn ngập sự mới mẻ và hứng khởi.
            </p>
            <br />
          </div>

          <div className="w-96 bg-white shadow-sm rounded-xl overflow-hidden">
            <img
              src="https://file.hstatic.net/1000313040/file/post_fb_pizza_1_b6a2cc244e2d4dca8dc214cbc5d0b512_grande.png"
              alt=""
              className="w-full"
            />
            <p className="text-center p-4 text-lg font-bold">
              DEAL HOT CẢ TUẦN - MUA 2 TẶNG 1
            </p>
            <p className="w-80 m-auto text-gray-500">
              {" "}
              Chương trình khuyến mãi dành riêng cho những chiếc Pizza Cấp Đông
              Tươi Ngon - An Toàn - Tiện Lợi từ 21/7 đến hết 27/7
            </p>
            <br />
          </div>
        </div>
      </div>
      <div className="my-24">
        <h1 className="text-4xl font-bold text-yellow-500 text-center">
          VỀ CHÚNG TÔI
        </h1>
        <h1 className="text-center my-8 font-bold">
          CHÀO MỪNG BẠN ĐẾN VỚI LANANH BAKERY
        </h1>
        <div className="w-3/4 flex m-auto gap-10">
          <img
            src="https://theme.hstatic.net/1000313040/1000406925/14/intro.png?v=2130"
            alt=""
            className="rounded-xl"
          />
          <span>
            Lan Anh Bakery là thương hiệu bánh ngọt Pháp của công ty cổ phần
            bánh ngọt Anh Hòa. Được thành lập từ năm 2004 tại con phố Ngõ Trạm,
            quận Hoàn Kiếm, Hà Nội. Trải qua hơn 15 năm phát triển, đến nay Anh
            Hòa Bakery đã có 13 cơ sở kinh doanh đặt trên những tuyến phố đông
            dân cư ở Hà Nội. Các sản phẩm Anh Hòa Bakery được làm từ các nguyên
            liệu nhập khẩu của các nước có truyền thống làm bánh như: Newzeland,
            Mỹ, Pháp, Bỉ. Với hương vị thơm ngon đặc trưng của các loại kem, bơ,
            sữa, phô mai, hạt hạnh nhân, chocolate... dưới bàn tay khéo léo của
            những người thợ làm bánh giàu kinh nghiệm. Quy mô xưởng sản xuất
            rộng hơn 2000m2 với các thiết bị tiên tiến hiện đại theo tiêu chuẩn
            ISO 2018, toàn bộ nhà máy được sơn phủ bởi sơn EPOXY đặc biệt. Lan
            Anh Bakery luôn mang đến cho khách hàng những sản phẩm chất lượng
            nhất, đảm bảo tuyệt đối về an toàn vệ sinh thực phẩm.
          </span>
        </div>
      </div>
      <div className="my-24">
        <p className="text-center font-mono text-3xl text-yellow-500">
          " Gửi Trọn Yêu Thương Qua Từng Chiếc Bánh "
        </p>
        <div className="flex justify-center my-20 gap-20">
          <div>
            <img
              src="https://savourebakery.com/storage/images/icon/Icon-Footer-1.svg"
              alt=""
            />
            <p className="font-thin text-lg">NGUYÊN LIỆU CHẤT LƯỢNG</p>
          </div>
          <div>
            <img
              src="https://savourebakery.com/storage/images/icon/Icon-Footer-2.svg"
              alt=""
            />
            <p className="font-thin text-lg">LÀM MỚI HÌNH ẢNH</p>
          </div>
          <div>
            <img
              src="https://savourebakery.com/storage/images/icon/Icon-Footer-3.svg"
              alt=""
            />
            <p className="font-thin text-lg">SỨC KHỎE VÀ AN TOÀN</p>
          </div>
          <div>
            <img
              src="https://savourebakery.com/storage/images/icon/Icon-Footer-4.svg"
              alt=""
            />
            <p className="font-thin text-lg">GIAO HÀNG NHANH CHÓNG</p>
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
                  <p>Tên miền phụ : banhngotphap.vn</p>
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
      <div>
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded p-6 w-1/4 relative ">
              {/* Nút đóng */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
              >
                &times; {/* Dấu x */}
              </button>
              <h2 className="text-lg font-bold">Modal heading</h2>
              <p>Woohoo, you are reading this text in a modal!</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                >
                  Close
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => {
                    handleAddToCart(product); // Add product to cart
                    setIsOpen(false); // Close modal after adding
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

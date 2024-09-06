"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Home() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsMenuVisible(true);
  };

  const handleMouseLeave = () => {
    setIsMenuVisible(false);
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
              <div
                className="relative flex items-center gap-4"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Icon and label */}
                <button className="h-10 w-10 bg-white flex justify-center items-center rounded-full">
                  <FontAwesomeIcon icon={faUserTie} className="w-5 h-5" />
                </button>
                <span className="text-white">Tài khoản</span>

                {/* Dropdown menu */}
                {isMenuVisible && (
                  <div className="absolute top-12 left-0 bg-white text-black rounded-lg shadow-lg w-32">
                    {/* Triangle arrow */}
                    <div className="absolute -top-2 left-4 w-4 h-4 bg-white transform rotate-45"></div>

                    {/* Options */}
                    <div className="flex flex-col py-2 px-4">
                      <button className="text-sm py-1 px-2 hover:bg-gray-200 cursor-pointer rounded-md text-left">
                        Đăng nhập
                      </button>
                      <button className="text-sm py-1 px-2 hover:bg-gray-200 cursor-pointer rounded-md text-left mt-1">
                        Đăng ký
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                <button className="h-10 w-10 bg-white flex justify-center items-center rounded-full">
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
              alt="slide 1"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://theme.hstatic.net/1000313040/1000406925/14/ms_banner_img2.jpg?v=2130"
              alt="slide 2"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://theme.hstatic.net/1000313040/1000406925/14/ms_banner_img3.jpg?v=2130"
              alt="slide 3"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://theme.hstatic.net/1000313040/1000406925/14/ms_banner_img4.jpg?v=2130"
              alt="slide 4"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://theme.hstatic.net/1000313040/1000406925/14/ms_banner_img5.jpg?v=2130"
              alt="slide 5"
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
      <div className="flex justify-evenly">
        <div className="w-72 overflow-hidden rounded-md shadow-lg">
          <img
            src="https://product.hstatic.net/1000313040/product/post_fb_trung_thu_5_1c555ac0719f4cf4808183ddf1ad31a8_large.png"
            alt=""
            className="hover:scale-105 transition-transform duration-300"
          />
          <div className="py-6">
            <h1 className="text-xl font-bold text-center">LỤC BẢO CÁT TƯỜNG</h1>
            <p className="text-center">LBCT90</p>
          </div>
          <div className="flex w-64 justify-between">
            <div className="flex ">
              <button className="bg-yellow-600 w-32 h-10 font-bold text-white">
                430,000
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
        <div className="w-72 overflow-hidden rounded-md shadow-lg">
          <img
            src="https://product.hstatic.net/1000313040/product/post_fb_trung_thu_6_023d0b82f1f24f79840d4cd7f60f3704_large.png"
            alt=""
            className="hover:scale-105 transition-transform duration-300"
          />
          <div className="py-6">
            <h1 className="text-xl font-bold text-center">
              NGŨ NGƯ VỌNG NGUYỆT
            </h1>
            <p className="text-center">NNVN90</p>
          </div>
          <div className="flex w-64 justify-between">
            <div className="flex ">
              <button className="bg-yellow-600 w-32 h-10 font-bold text-white">
                365,000
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
        <div className="w-72 overflow-hidden rounded-md shadow-lg">
          <img
            src="https://product.hstatic.net/1000313040/product/post_fb_trung_thu_3_521c1313a07e426fb9272923c86b10b4_large.png"
            alt=""
            className="hover:scale-105 transition-transform duration-300"
          />
          <div className="py-6">
            <h1 className="text-xl font-bold text-center">NGỰ UYỂN AN KHANG</h1>
            <p className="text-center">NUAK90</p>
          </div>
          <div className="flex w-64 justify-between">
            <div className="flex ">
              <button className="bg-yellow-600 w-32 h-10 font-bold text-white">
                560,000
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
        <div className="w-72 overflow-hidden rounded-md shadow-lg">
          <img
            src="https://product.hstatic.net/1000313040/product/post_fb_trung_thu_13_4bb3766bbea344248223a11c870e73bd_large.png"
            alt=""
            className="hover:scale-105 transition-transform duration-300"
          />
          <div className="py-6">
            <h1 className="text-xl font-bold text-center">SONG LỘC</h1>
            <p className="text-center">SL90</p>
          </div>
          <div className="flex w-64 justify-between">
            <div className="flex ">
              <button className="bg-yellow-600 w-32 h-10 font-bold text-white">
                140,000
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
        <div className="w-72 overflow-hidden rounded-md shadow-md">
          <img
            src="https://product.hstatic.net/1000313040/product/post_fb_trung_thu_12_6bb2feb3703a4487a1820c21b753be7b_large.png"
            alt=""
            className="hover:scale-105 transition-transform duration-300"
          />
          <div className="py-6">
            <h1 className="text-xl font-bold text-center">TAM NGUYỆT LỘC</h1>
            <p className="text-center">TNL90</p>
          </div>
          <div className="flex w-64 justify-between">
            <div className="flex ">
              <button className="bg-yellow-600 w-32 h-10 font-bold text-white">
                225,000
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
        <div className="w-72 overflow-hidden rounded-md shadow-lg">
          <img
            src="https://product.hstatic.net/1000313040/product/post_fb_trung_thu_8_bb9603b9dde34551a89dc8e5a8ce2283_large.png"
            alt=""
            className="hover:scale-105 transition-transform duration-300"
          />
          <div className="py-6">
            <h1 className="text-xl font-bold text-center">TỨ QUÝ BÌNH AN</h1>
            <p className="text-center">TQBA90</p>
          </div>
          <div className="flex w-64 justify-between">
            <div className="flex ">
              <button className="bg-yellow-600 w-32 h-10 font-bold text-white">
                310,000
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
        <div className="w-72 overflow-hidden rounded-md shadow-lg">
          <img
            src="https://product.hstatic.net/1000313040/product/post_fb_trung_thu_10_c95fec74458445acbbf052ec7c2f5692_large.png"
            alt=""
            className="hover:scale-105 transition-transform duration-300"
          />
          <div className="py-6">
            <h1 className="text-xl font-bold text-center">TỨ QUÝ ĐOÀN VIÊN</h1>
            <p className="text-center">TQDV90</p>
          </div>
          <div className="flex w-64 justify-between">
            <div className="flex ">
              <button className="bg-yellow-600 w-32 h-10 font-bold text-white">
                310,000
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
        <div className="w-72 overflow-hidden rounded-md shadow-lg">
          <img
            src="https://product.hstatic.net/1000313040/product/post_fb_trung_thu_13_4bb3766bbea344248223a11c870e73bd_large.png"
            alt=""
            className="hover:scale-105 transition-transform duration-300"
          />
          <div className="py-6">
            <h1 className="text-xl font-bold text-center">TỨ QUÝ SUM VẦY</h1>
            <p className="text-center">TQSV90</p>
          </div>
          <div className="flex w-64 justify-between">
            <div className="flex ">
              <button className="bg-yellow-600 w-32 h-10 font-bold text-white">
                342,000
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
        <button className="w-32 h-10 bg-rose-900 rounded-lg font-bold text-white">
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
        <div className="w-72 overflow-hidden rounded-md shadow-md">
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
        <div className="w-72 overflow-hidden rounded-md shadow-md">
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
        <div className="w-72 overflow-hidden rounded-md shadow-md">
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
        <div className="w-72 overflow-hidden rounded-md shadow-md">
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
        <div className="w-72 overflow-hidden rounded-md shadow-md">
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
        <div className="w-72 overflow-hidden rounded-md shadow-md">
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
        <div className="w-72 overflow-hidden rounded-md shadow-md">
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
        <div className="w-72 overflow-hidden rounded-md shadow-md">
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
        <button className="w-32 h-10 bg-rose-900 rounded-lg font-bold text-white">
          XEM THÊM
        </button>
      </div>
    </>
  );
}

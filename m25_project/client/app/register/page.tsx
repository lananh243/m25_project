"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);

  const handlePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <div className="w-full h-screen relative">
        <div className="absolute inset-0">
          <img
            src="https://blogphanmem.vn/wp-content/uploads/2022/09/hinh-nen-trung-thu.jpg"
            alt=""
            className="w-full h-screen object-cover"
          />
        </div>
        <div className="flex w-10/12 justify-end items-center h-screen pr-10 m-auto">
          <div className="absolute inset-0 flex items-center w-2/5 mx-80">
            <div className="text-white font-extrabold text-5xl ">
              Have an account ?
              <button className="hover:text-blue-400">Login Here</button>
            </div>
          </div>
          <div className="relative z-10 shadow-md bg-white p-4 w-2/5 rounded-xl">
            <h1 className="text-center text-xl">Register</h1>
            <br />
            <div className="w-96 m-auto">
              <p>UserName</p>
              <input
                type="text"
                placeholder="Nhập tên"
                className="w-full px-4 h-9 border-2 border-solid border-gray-200"
              />
              <br />
              <br />
              <p>Symbol name</p>
              <input
                type="text"
                placeholder="Nhập kí hiệu"
                className="w-full px-4 h-9 border-2 border-solid border-gray-200"
              />
              <br />
              <br />
              <p>Email</p>
              <input
                type="email"
                placeholder="Nhập email"
                className="w-full px-4 h-9 border-2 border-solid border-gray-200"
              />
              <br />
              <br />
              <p>Password</p>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  className="w-full px-4 h-9 border-2 border-solid border-gray-200"
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={handlePassword}
                >
                  {showPassword ? (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      className="h-5 w-5 text-gray-600"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEye}
                      className="h-5 w-5 text-gray-600"
                    />
                  )}
                </div>
              </div>
              <br />
              <p>Phone number</p>
              <input
                type="text"
                placeholder="Nhập số điện thoại"
                className="w-full px-4 h-9 border-2 border-solid border-gray-200"
              />
              <br />
              <br />
              <p>Address</p>
              <input
                type="text"
                placeholder="Nhập địa chỉ"
                className="w-full px-4 h-9 border-2 border-solid border-gray-200"
              />
              <br />
              <br />
              <br />
              <button className="w-full bg-purple-400 h-9 text-white rounded-xl">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

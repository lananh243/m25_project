"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addUser, getAllUser } from "../service/user.service";

export default function Page() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
    address: "",
    phone: "",
    active: true,
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
    address: "",
    phone: "",
    active: "",
  });
  const resetInput = () => {
    setInputValue({
      name: "",
      email: "",
      password: "",
      repassword: "",
      address: "",
      phone: "",
      active: true,
    });
  };
  const handlePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^(0[3-9][0-9]{8})$/;
    return phoneRegex.test(phone);
  };

  const handleRegister = async () => {
    let validate = true;
    let newError = { ...error };

    if (!inputValue.name) {
      newError.name = "Tên người dùng không được để trống";
      validate = false;
    } else {
      newError.name = "";
    }

    if (!inputValue.email) {
      newError.email = "Email không được để trống";
      validate = false;
    } else if (!validateEmail(inputValue.email)) {
      newError.email = "Email không hợp lệ";
      validate = false;
    } else {
      newError.email = "";
    }

    if (!inputValue.address) {
      newError.address = "Địa chỉ không được để trống";
      validate = false;
    } else {
      newError.address = "";
    }

    if (!inputValue.password) {
      newError.password = "Mật khẩu không được để trống";
      validate = false;
    } else if (inputValue.password.length < 8) {
      newError.password = "Mật khẩu phải có ít nhất 8 ký tự";
      validate = false;
    } else {
      newError.password = "";
    }

    if (inputValue.password !== inputValue.repassword) {
      newError.repassword = "Mật khẩu xác nhận không khớp";
      validate = false;
    } else {
      newError.repassword = "";
    }

    if (!inputValue.phone) {
      newError.phone = "Số điện thoại không được để trống";
      validate = false;
    } else if (!validatePhoneNumber(inputValue.phone)) {
      newError.phone = "Số điện thoại không hợp lệ";
      validate = false;
    } else {
      newError.phone = "";
    }

    setError(newError);
    if (validate) {
      const newUser = {
        name: inputValue.name,
        email: inputValue.email,
        password: inputValue.password,
        phone: inputValue.phone,
        address: inputValue.address,
        repassword: inputValue.repassword,
        active: true,
      };
      try {
        await dispatch(addUser(newUser));
        dispatch(getAllUser());
        resetInput();
      } catch (err) {
        console.error("Lỗi khi thêm người dùng", err);
      }
    }
  };

  return (
    <>
      <div className="w-full h-screen relative">
        <div className="absolute inset-0">
          <img
            src="https://png.pngtree.com/background/20211215/original/pngtree-mid-autumn-festival-small-fresh-moon-cartoon-background-element-picture-image_1463306.jpg"
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
                name="name"
                onChange={handleChange}
                value={inputValue.name}
              />
              <br />
              {error.name && <span className="text-red-400">{error.name}</span>}
              <br />
              <p>Email</p>
              <input
                type="email"
                placeholder="Nhập email"
                className="w-full px-4 h-9 border-2 border-solid border-gray-200"
                onChange={handleChange}
                value={inputValue.email}
                name="email"
              />
              <br />
              {error.email && (
                <span className="text-red-400">{error.email}</span>
              )}
              <br />
              <p>Password</p>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  className="w-full px-4 h-9 border-2 border-solid border-gray-200"
                  onChange={handleChange}
                  value={inputValue.password}
                  name="password"
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
              {error.password && (
                <span className="text-red-400">{error.password}</span>
              )}
              <p>RePassword</p>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu"
                  className="w-full px-4 h-9 border-2 border-solid border-gray-200"
                  onChange={handleChange}
                  value={inputValue.repassword}
                  name="repassword"
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
              {error.repassword && (
                <span className="text-red-400">{error.repassword}</span>
              )}
              <p>Phone number</p>
              <input
                type="text"
                placeholder="Nhập số điện thoại"
                className="w-full px-4 h-9 border-2 border-solid border-gray-200"
                name="phone"
                onChange={handleChange}
                value={inputValue.phone}
              />
              <br />
              {error.phone && (
                <span className="text-red-400">{error.phone}</span>
              )}
              <br />
              <p>Address</p>
              <input
                type="text"
                placeholder="Nhập địa chỉ"
                className="w-full px-4 h-9 border-2 border-solid border-gray-200"
                name="address"
                onChange={handleChange}
                value={inputValue.address}
              />
              <br />
              {error.address && (
                <span className="text-red-400">{error.address}</span>
              )}
              <br />
              <br />
              <button
                className="w-full bg-purple-400 h-9 text-white rounded-xl"
                onClick={handleRegister}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

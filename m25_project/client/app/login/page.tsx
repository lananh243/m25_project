"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addUser, getAllUser } from "../service/user.service";
import { useRouter } from "next/navigation";
import { Button, Modal } from "react-bootstrap";

export default function Page() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    dispatch(getAllUser());
  }, []);
  const userData: any = useSelector((state: any) => state.userReducer.users);
  const [accUser, setAccUser] = useState([]);
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
  });
  const resetInput = () => {
    setInputValue({
      name: "",
      email: "",
      password: "",
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

  const handleRegister = async () => {
    let validate = true;
    let newError = { ...error };
    // Validate email
    if (!inputValue.email) {
      newError.email = "Email ko được để trống";
      validate = false;
    } else if (!validateEmail(inputValue.email)) {
      newError.email = "Email ko đúng định dạng";
      validate = false;
    } else {
      newError.email = "";
    }

    // Validate password
    if (!inputValue.password) {
      newError.password = "Mật khẩu không được để trống";
      validate = false;
    } else if (inputValue.password.length < 8) {
      newError.password = "Mật khẩu phải có ít nhất 8 ký tự";
      validate = false;
    } else {
      newError.password = "";
    }

    setError(newError);

    if (validate) {
      const userExists = userData.find(
        (user: any) =>
          user.email === inputValue.email &&
          user.password === inputValue.password
      );

      if (userExists) {
        localStorage.setItem("user", JSON.stringify(userExists));
        setShow(true);
        resetInput();
      } else {
        alert("Thông tin đăng nhập ko chính xác");
        localStorage.removeItem("user");
      }
    }
  };

  const route = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    route.push("/home");
  };

  return (
    <>
      <div className="w-full h-screen relative">
        <div className="absolute inset-0">
          <img
            src="https://png.pngtree.com/background/20210715/original/pngtree-mid-autumn-festival-creative-minimalist-background-picture-image_1322108.jpg"
            alt=""
            className="w-full h-screen object-cover"
          />
        </div>
        <div className="flex w-10/12 justify-end items-center h-screen pr-10 m-auto">
          <div className="absolute inset-0 flex items-center w-2/5 mx-64">
            <div className="text-white font-extrabold text-5xl ">
              Don't have an account ?
              <button className="hover:text-blue-400">Register Here</button>
            </div>
          </div>
          <div className="relative z-10 shadow-md bg-white p-4 w-2/5 rounded-xl">
            <h1 className="text-center text-xl">Login</h1>
            <br />
            <div className="w-96 m-auto">
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
              {error.password && (
                <span className="text-red-400">{error.password}</span>
              )}
              <br />
              <br />
              <button
                className="w-full bg-purple-400 h-9 text-white rounded-xl"
                onClick={handleRegister}
              >
                Login
              </button>
            </div>
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body className="flex items-center gap-3">
            <img
              src="https://ich.edu.vn/App_Files/Upload/2019/icon-thanh-cong.png"
              alt=""
              className="w-10 h-10"
            />
            Bạn đã đăng nhập user thành công!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

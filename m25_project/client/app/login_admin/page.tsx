"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const route = useRouter();

  const handleClose = () => {
    setShow(false);
    route.push("/admin/dashboard");
  };

  const [accAdmin, setAccAdmin] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let res = await axios.get("http://localhost:8080/admin");
      setAccAdmin(res.data);
    };
    getData();
  }, []);

  const handleValidation = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", password: "" };

    if (!name.trim()) {
      newErrors.name = "UserName không được để trống";
      isValid = false;
    }
    if (!email.trim()) {
      newErrors.email = "Email không được để trống";
      isValid = false;
    }
    if (!password.trim()) {
      newErrors.password = "Password không được để trống";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      const matchedAdmin = accAdmin.find(
        (admin: any) =>
          admin.name === name &&
          admin.email === email &&
          admin.password === password
      );

      if (matchedAdmin) {
        const adminData = {
          name: name,
          email: email,
          password: password,
        };
        localStorage.setItem("admin", JSON.stringify(adminData));

        setShow(true);
      } else {
        alert("Thông tin đăng nhập không chính xác");
        setName("");
        setEmail("");
        setPassword("");
        localStorage.removeItem("admin");
      }
    }
  };

  return (
    <div className="flex">
      <div className="w-2/4 h-screen bg-purple-700 ">
        <h1 className="text-3xl font-bold text-center my-12">
          ĐĂNG NHẬP ADMIN
        </h1>
        <div className="w-3/4 m-auto">
          <p>UserName</p>
          <input
            type="text"
            className="w-80 h-8 py-4 p-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="text-red-400">{errors.name}</p>}
          <p className="py-3">Email</p>
          <input
            type="email"
            className="w-80 h-8 py-4 p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-400">{errors.email}</p>}
          <p className="my-3">Password</p>
          <input
            type="password"
            className="w-80 h-8 py-4 p-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-400">{errors.password}</p>}
        </div>
        <div className=" flex justify-center my-24">
          <button
            className="w-3/4 h-12 bg-blue-400 text-white text-lg font-bold rounded-md"
            onClick={handleSubmit}
          >
            Đăng Nhập
          </button>
        </div>
      </div>
      <div className="h-screen">
        <img
          src="https://png.pngtree.com/background/20210709/original/pngtree-antiquity-beautiful-moon-cake-food-picture-image_922052.jpg"
          alt=""
          className="h-full"
        />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="flex items-center gap-3">
          <img
            src="https://ich.edu.vn/App_Files/Upload/2019/icon-thanh-cong.png"
            alt=""
            className="w-10 h-10"
          />
          Bạn đã đăng nhập với Admin thành công!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

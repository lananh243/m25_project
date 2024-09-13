"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHomeLg,
  faSearch,
  faUserGroup,
  faCalendarPlus,
  faPager,
  faBell,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  getAllUser,
  searchUser,
  sortUser,
  toggleUserStatus,
} from "@/app/service/user.service";

export default function Page() {
  const [admin, setAdmin] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [searchName, setSearchName] = useState("");
  const [sortName, setSortName] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const route = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const userState = useSelector((state: any) => state.userReducer.users);
  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    if (!adminData) {
      route.push("/login_admin");
    } else {
      setAdmin(JSON.parse(adminData));
    }
  }, [route]);
  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
    phone: "",
    address: "",
    active: true,
  });

  const [err, setErr] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
    phone: "",
    address: "",
    active: "",
  });

  const resetInput = () => {
    setInputValue({
      name: "",
      email: "",
      password: "",
      repassword: "",
      phone: "",
      address: "",
      active: true,
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
  const handleAddUser = async () => {
    let valid = true;
    let newErr = { ...err };
    if (!inputValue.name) {
      newErr.name = "Tên không được để trống";
      valid = false;
    } else {
      newErr.name = "";
    }
    if (!inputValue.email) {
      newErr.email = "Email ko được để trống";
      valid = false;
    } else if (!validateEmail(inputValue.email)) {
      newErr.email = "Email ko đúng định dạng";
      valid = false;
    } else {
      newErr.email = "";
    }
    if (!inputValue.password) {
      newErr.password = "Mật khẩu ko đc để trống";
      valid = false;
    } else if (inputValue.password.length < 8) {
      newErr.password = "Mật khẩu phải có ít nhất 8 ký tự";
      valid = false;
    } else {
      newErr.password = "";
    }
    if (inputValue.password !== inputValue.repassword) {
      newErr.repassword = "Mật khẩu ko khớp";
      valid = false;
    } else {
      newErr.repassword = "";
    }
    if (!inputValue.phone) {
      newErr.phone = "Số điện thoại ko đc để trống";
      valid = false;
    } else if (!validatePhoneNumber(inputValue.phone)) {
      newErr.phone = "Số điện thoại ko hợp lệ";
      valid = false;
    } else {
      newErr.phone = "";
    }
    if (!inputValue.address) {
      newErr.address = "Địa chỉ ko đc để trống";
      valid = false;
    } else {
      newErr.address = "";
    }
    setErr(newErr);
    if (valid) {
      const newUser = {
        name: inputValue.name,
        email: inputValue.email,
        password: inputValue.password,
        repassword: inputValue.repassword,
        phone: inputValue.phone,
        address: inputValue.address,
        active: true,
      };
      try {
        await dispatch(addUser(newUser));
        dispatch(getAllUser());
        setShow(false);
        resetInput();
      } catch (err) {
        console.error("Lỗi khi thêm người dùng", err);
      }
    }
  };

  const handleUser = () => {
    route.push("/admin/users");
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const handleProduct = () => {
    route.push("/admin/products");
  };

  const handleCategory = () => {
    route.push("/admin/category");
  };

  // Tìm kiếm
  const handleSearch = () => {
    dispatch(searchUser(searchName));
  };

  // Sắp xếp
  const handleSortName = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value;
    console.log("order: ", order);

    dispatch(sortUser(order));
  };

  // Thêm mới
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  // Mở và khóa

  const handleUserStatusChange = async (
    userId: number,
    currentStatus: boolean
  ) => {
    try {
      await dispatch(toggleUserStatus({ id: userId, currentStatus }));
      dispatch(getAllUser());
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái người dùng", err);
    }
  };
  const handlePassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const [showModal, setShowModal] = useState(false);

  const handleCloseStatus = () => setShowModal(false);
  const handleShowStatus = (user: any) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  return (
    <div className="flex h-screen">
      {/* Menu */}
      <div className="w-1/4 bg-rose-600">
        <div className="py-14 flex justify-center">
          <span className="text-xl font-bold">Quản lí</span>
        </div>
        <div className="w-52 m-auto py-12">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faHomeLg} className="w-6 h-6" />
            <span className="mx-5">Trang chủ</span>
          </div>
          <div
            className="flex items-center my-14 hover:bg-gray-50 hover:cursor-pointer h-9 rounded"
            onClick={handleUser}
          >
            <FontAwesomeIcon icon={faUserGroup} className="w-6 h-6" />
            <span className="mx-5 whitespace-nowrap">Quản lí user</span>
          </div>
          <div
            className="flex items-center my-14 hover:bg-gray-50 hover:cursor-pointer h-9 rounded"
            onClick={handleCategory}
          >
            <FontAwesomeIcon icon={faCalendarPlus} className="w-6 h-6 " />
            <span className="mx-5 whitespace-nowrap">Quản lí danh mục</span>
          </div>
          <div
            className="flex items-center my-14 hover:bg-gray-50 hover:cursor-pointer h-9 rounded"
            onClick={handleProduct}
          >
            <FontAwesomeIcon icon={faPager} className="w-6 h-6" />
            <span className="mx-5 whitespace-nowrap ">Quản lí sản phẩm</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="w-full bg-slate-50">
        <div className="w-full h-28 bg-gray-100 flex items-center justify-between">
          <div className="flex w-11/12 justify-between m-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm ..."
                className="pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setSearchName(e.target.value)}
                value={searchName}
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                onClick={handleSearch}
              />
            </div>
            <div className="flex items-center gap-7">
              <FontAwesomeIcon icon={faBell} className="w-6 h-6" />
              {admin && (
                <div className="flex items-center">
                  <button className="w-12 h-12 rounded-full bg-red-300 flex justify-center items-center">
                    <img
                      src="https://i.pinimg.com/originals/9f/81/66/9f81666e83e9a49f1c11fa0961fe220d.jpg"
                      alt=""
                      className="rounded-full"
                    />
                  </button>
                  <span className="mx-7">{admin.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="p-10 h-24 text-lg text-red-400 font-extrabold flex justify-between">
          <div>User</div>
          <div className="flex gap-10">
            <div>
              <select
                className="h-9 border-gray-300 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 text-black"
                value={sortName}
                onChange={handleSortName}
              >
                <option value="">Sắp xếp theo tên</option>
                <option value="asc">A -&gt; Z</option>
                <option value="desc">Z -&gt; A</option>
              </select>
            </div>
            <div>
              <button
                className="h-9 bg-blue-400 w-28 rounded text-white"
                onClick={handleShow}
              >
                Thêm mới
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-11/12 m-auto shadow-sm rounded">
          <table className="w-full rounded">
            <thead>
              <tr className="text-center">
                <th className="p-3">STT</th>
                <th className="p-3">Tên đăng nhập</th>
                <th className="p-3">Email</th>
                <th className="p-3">Số điện thoại</th>
                <th className="p-3">Địa chỉ</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {userState.map((user: any) => (
                <tr
                  className="border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                  key={user.id}
                >
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.phone}</td>
                  <td className="p-3">{user.address}</td>
                  <td className="p-3">{user.active ? "active" : "inactive"}</td>
                  <td className="p-3">
                    <button
                      className={`w-24 h-8 rounded text-white ${
                        user.active ? "bg-blue-300" : "bg-red-500"
                      }`}
                      onClick={() => handleShowStatus(user)}
                    >
                      {user.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-11/12 m-auto justify-center flex gap-2 py-16">
          <button className="bg-orange-400 text-white w-8 h-8 rounded">
            1
          </button>
          <button className="bg-orange-400 text-white w-8 h-8 rounded">
            2
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tên người dùng</p>
          <input
            type="text"
            className=" w-96 h-8 border-2 border-solid border-gray-200 rounded"
            name="name"
            onChange={handleChange}
          />
          <br />
          {err.name && <span className="text-red-400">{err.name}</span>}
          <br />
          <p>Email</p>
          <input
            type="text"
            className=" w-96 h-8 border-2 border-solid border-gray-200 rounded"
            name="email"
            onChange={handleChange}
          />
          <br />
          {err.email && <span className="text-red-400">{err.email}</span>}
          <br />
          <p>Mật khẩu</p>
          <div className="relative w-96">
            <input
              type="text"
              className=" w-full h-8 border-2 border-solid border-gray-200 rounded"
              name="password"
              onChange={handleChange}
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
          {err.password && <span className="text-red-400">{err.password}</span>}
          <br />
          <p>Nhập lại mật khẩu</p>
          <div className="relative w-96">
            <input
              type="text"
              className=" w-full h-8 border-2 border-solid border-gray-200 rounded"
              name="repassword"
              onChange={handleChange}
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
          {err.repassword && (
            <span className="text-red-400">{err.repassword}</span>
          )}
          <br />
          <p>Số điện thoại </p>
          <input
            type="text"
            className=" w-96 h-8 border-2 border-solid border-gray-200 rounded"
            name="phone"
            onChange={handleChange}
          />
          <br />
          {err.phone && <span className="text-red-400">{err.phone}</span>}
          <br />
          <p>Địa chỉ</p>
          <input
            type="text"
            className=" w-96 h-8 border-2 border-solid border-gray-200 rounded"
            name="address"
            onChange={handleChange}
          />
          <br />
          {err.address && <span className="text-red-400">{err.address}</span>}
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/*  */}
      <Modal show={showModal} onHide={handleCloseStatus}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedUser?.active ? "Vô hiệu hóa" : "Kích hoạt"} người dùng
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          Bạn có chắn chắn muốn{" "}
          {selectedUser?.active ? "vô hiệu hóa" : "kích hoạt"} người dùng ??
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseStatus}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleUserStatusChange(selectedUser.id, selectedUser.active);
              handleCloseStatus();
            }}
          >
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

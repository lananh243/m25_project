"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHomeLg,
  faSearch,
  faUserGroup,
  faCalendarPlus,
  faPager,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  addCategory,
  deleteCategory,
  editCategory,
  getAllCategory,
  searchNameCategory,
  sortNameCategory,
} from "@/app/service/category.service";
export default function Product() {
  const [admin, setAdmin] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const route = useRouter();
  const dispatch = useDispatch();
  const categoryState = useSelector(
    (state: any) => state.categoryReducer.categorys
  );

  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    if (!adminData) {
      route.push("/login_admin");
    } else {
      setAdmin(JSON.parse(adminData));
    }
  }, [route]);

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);
  const handleUser = () => {
    route.push("/admin/users");
  };
  const handleProduct = () => {
    route.push("/admin/products");
  };
  const handleSearchName = () => {
    dispatch(searchNameCategory(search));
  };
  const handleSort = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value;
    dispatch(sortNameCategory(order));
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setEditModal(false);
    setSelect(null);
    setInputValue({
      name: "",
    });
    setShow(true);
  };
  // Thêm sản phẩm

  const [inputValue, setInputValue] = useState({
    name: "",
  });

  const [err, setErr] = useState({
    name: "",
  });

  const reset = () => {
    setInputValue({
      name: "",
    });
  };
  // Sửa
  const [editModal, setEditModal] = useState(false);
  const [select, setSelect] = useState<any>(null);
  const handleEditCategory = (category: any) => {
    setSelect(category);
    setInputValue({
      name: category.name,
    });
    setEditModal(true);
    setShow(true);
  };
  const handleAddOrUpadateCategory = async () => {
    let valid = true;
    let newErr = { ...err };
    if (!inputValue.name) {
      newErr.name = "Tên danh mục không được để trống";
      valid = false;
    } else {
      newErr.name = "";
    }
    setErr(newErr);
    if (valid) {
      const newCategory = {
        name: inputValue.name,
      };
      try {
        if (editModal && select) {
          await dispatch(editCategory({ id: select.id, ...newCategory }));
        } else {
          await dispatch(addCategory(newCategory));
        }
        dispatch(getAllCategory());
        setShow(false);
        reset();
      } catch (err) {
        console.error("Lỗi khi thêm danh mục", err);
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleDelete = (id: number) => {
    alert("Bạn có muốn xóa sản phẩm này ko ??");
    dispatch(deleteCategory(id));
  };
  return (
    <div
      className="flex h-screen"
      style={{ height: "100vh", overflowY: "scroll", position: "relative" }}
    >
      {/* Menu */}
      <div
        className="w-1/4 bg-rose-600"
        style={{ position: "sticky", top: 0, left: 0, zIndex: 1 }}
      >
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
          <div className="flex items-center my-14">
            <FontAwesomeIcon icon={faCalendarPlus} className="w-6 h-6" />
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
      <div
        className="w-full bg-slate-50"
        style={{ height: "100vh", overflowY: "scroll", position: "relative" }}
      >
        <div
          className="w-full h-28 bg-gray-100 flex items-center justify-between"
          style={{ position: "sticky", top: 0, left: 0, zIndex: 1 }}
        >
          <div className="flex w-11/12 justify-between m-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm ..."
                className="pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                onClick={handleSearchName}
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
          <div>Category</div>
          <div className="flex gap-10">
            <div>
              <select
                className="h-9 border-gray-300 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 text-black"
                value={sort}
                onChange={handleSort}
              >
                <option value="">Sắp xếp theo tên</option>
                <option value="asc">A -&gt; Z</option>
                <option value="desc">Z -&gt; A</option>
              </select>
            </div>
            <div>
              <button
                className="w-28 h-9 bg-blue-400 rounded text-white"
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
                <th className="p-3">Tên sản phẩm</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {categoryState.map((category: any) => (
                <tr
                  className="border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                  key={category.id}
                >
                  <td className="p-3">{category.id}</td>
                  <td className="p-3">{category.name}</td>
                  <td className="p-3">
                    <div className="flex justify-center gap-3">
                      <button
                        className="w-12 h-8 bg-yellow-400 text-white rounded"
                        onClick={() => handleEditCategory(category)}
                      >
                        Sửa
                      </button>
                      <button
                        className="w-12 h-8 bg-red-400 text-white rounded"
                        onClick={() => handleDelete(category.id)}
                      >
                        Xóa
                      </button>
                    </div>
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
          <Modal.Title>
            {editModal ? "Sửa danh mục" : "Thêm danh mục"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tên danh mục</p>
          <input
            type="text"
            className=" w-96 h-8 border-2 border-solid border-gray-200 rounded"
            name="name"
            value={inputValue.name}
            onChange={handleChange}
          />
          <br />
          <br />
          {err.name && <span className="text-red-400">{err.name}</span>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddOrUpadateCategory}>
            {editModal ? "Cập nhật" : "Thêm danh mục"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

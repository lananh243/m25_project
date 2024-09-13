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
import { useRouter } from "next/navigation";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  getAllProduct,
  searchNameProduct,
  sortProduct,
} from "@/app/service/product.service";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getAllCategory } from "@/app/service/category.service";
import { storage } from "@/src/config/config";
export default function Product() {
  const [admin, setAdmin] = useState<any>([]);
  const [searchName, setSearchName] = useState("");
  const [sortName, setSortName] = useState("");
  const route = useRouter();
  const dispatch = useDispatch();
  const productState = useSelector(
    (state: any) => state.productReducer.products
  );
  const categoryData: any = useSelector(
    (state: any) => state.categoryReducer.categorys
  );
  const [categoryId, setCategoryId] = useState<number>(0);
  // console.log(productState);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    if (!adminData) {
      route.push("/login_admin");
    } else {
      setAdmin(JSON.parse(adminData));
    }
  }, [route]);

  useEffect(() => {
    dispatch(getAllProduct());
  }, []);
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);
  const handleSearch = () => {
    dispatch(searchNameProduct(searchName));
  };

  const handleSortName = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value;
    dispatch(sortProduct(order));
  };
  const handleDelete = (id: number) => {
    alert("Bạn có muốn xóa sản phẩm này ko ???");
    dispatch(deleteProduct(id));
  };
  const handleUser = () => {
    route.push("/admin/users");
  };
  const handleProduct = () => {
    route.push("/admin/products");
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  //   Thêm sản phẩm
  const [inputValue, setInputValue] = useState({
    nameProduct: "",
    price: 0,
    image: "",
    code: "",
    categoryId: 0,
    quantity: 1,
  });

  const [error, setError] = useState({
    nameProduct: "",
    price: "",
    image: "",
    code: "",
    categoryId: "",
    quantity: "",
  });

  const reset = () => {
    setInputValue({
      nameProduct: "",
      price: 0,
      code: "",
      image: "",
      categoryId: 0,
      quantity: 1,
    });
    setImage("https://vnsteelthanglong.vn/core/img/default_image.png");
  };
  const handleAddOrUpdateProduct = async () => {
    let valid = true;
    let newError = { ...error }; // Tạo bản sao của đối tượng error

    if (!inputValue.nameProduct) {
      newError.nameProduct = "Tên sản phẩm không được để trống";
      valid = false;
    } else {
      newError.nameProduct = "";
    }
    if (!inputValue.price) {
      newError.price = "Vui lòng nhập giá";
      valid = false;
    } else {
      newError.price = "";
    }

    if (!inputValue.code) {
      newError.code = "Vui lòng nhập mã code";
      valid = false;
    } else {
      newError.code = "";
    }

    // Cập nhật state error mới
    setError(newError);

    if (valid) {
      const newProduct = {
        nameProduct: inputValue.nameProduct,
        price: inputValue.price,
        image: image,
        code: inputValue.code,
        categoryId: inputValue.categoryId,
        quantity: inputValue.quantity,
      };

      try {
        if (editMode && selectedProduct) {
          await dispatch(
            editProduct({ id: selectedProduct.id, ...newProduct })
          );
        } else {
          await dispatch(addNewProduct(newProduct));
        }
        dispatch(getAllProduct());
        setShow(false); // Đóng modal khi thành công
        reset(); // Reset form khi thành công
      } catch (error) {
        console.error("Error adding product:", error);
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
  const handleShow = () => {
    setEditMode(false); // Đặt lại chế độ thêm mới
    setSelectedProduct(null); // Đặt lại sản phẩm đã chọn
    setInputValue({
      nameProduct: "",
      price: 0,
      code: "",
      image: "",
      categoryId: 0,
      quantity: 1,
    });
    setImage("https://vnsteelthanglong.vn/core/img/default_image.png");
    setShow(true);
  };
  const [image, setImage] = useState(
    "https://vnsteelthanglong.vn/core/img/default_image.png"
  );
  const changeImage = async (e: any) => {
    let selectedImage = e.target.files?.[0];
    if (selectedImage) {
      const imageRef = ref(storage, `upload-image/${selectedImage.name}`);
      uploadBytes(imageRef, selectedImage).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);

          setImage(url);
        });
      });
      const previewUrl = URL.createObjectURL(selectedImage);
      setImage(previewUrl); // Hiển thị ảnh xem trước từ URL tạm thời
    }
  };
  //   Sửa sản phẩm
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setInputValue({
      nameProduct: product.nameProduct,
      price: product.price,
      image: product.image,
      code: product.code,
      categoryId: product.categoryId,
      quantity: product.quantity,
    });
    setEditMode(true);
    setImage(product.image);
    setShow(true);
  };

  const handleCategory = () => {
    route.push("/admin/category");
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
          <div
            className="flex items-center my-14 hover:bg-gray-50 hover:cursor-pointer h-9 rounded"
            onClick={handleCategory}
          >
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
          <div>Product</div>
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
                <th className="p-3">Ảnh</th>
                <th className="p-3">Giá</th>
                <th className="p-3">Mã sản phẩm</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {productState.map((product: any) => (
                <tr
                  className="border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                  key={product.id}
                >
                  <td className="p-3">{product.id}</td>
                  <td className="p-3">{product.nameProduct}</td>
                  <td className="p-3">
                    <img
                      className="w-48 h-48 rounded"
                      src={product.image}
                      alt=""
                    />
                  </td>
                  <td className="p-3">{product.price}</td>
                  <td className="p-3">{product.code}</td>
                  <td className="p-3">
                    <div className="flex justify-center gap-3">
                      <button
                        className="w-12 h-8 bg-yellow-400 text-white rounded"
                        onClick={() => handleEdit(product)}
                      >
                        Sửa
                      </button>
                      <button
                        className="w-12 h-8 bg-red-400 text-white rounded"
                        onClick={() => handleDelete(product.id)}
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
            {editMode ? "Sửa sản phẩm" : "Thêm sản phẩm"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tên sản phẩm</p>
          <input
            type="text"
            className=" w-96 h-8 border-2 border-solid border-gray-200 rounded"
            onChange={handleChange}
            name="nameProduct"
            value={inputValue.nameProduct}
          />
          <br />
          {error.nameProduct && (
            <span style={{ color: "red", fontSize: 14 }}>
              {error.nameProduct}
            </span>
          )}
          <br />
          <p>Ảnh sản phẩm</p>
          <input
            type="file"
            onChange={changeImage}
            className=" rounded "
            accept="image/*"
          />
          <br />
          {image && (
            <img src={image} alt="Product Image" className="w-48 h-28 mt-4" />
          )}
          <br />
          <br />
          <p>Giá sản phẩm</p>
          <input
            type="text"
            className=" w-96 h-8 border-2 border-solid border-gray-200 rounded"
            name="price"
            onChange={handleChange}
            value={inputValue.price}
          />
          <br />
          {error.price && (
            <span style={{ color: "red", fontSize: 14 }}>{error.price}</span>
          )}
          <br />
          <p>Mã sản phẩm</p>
          <input
            type="text"
            className=" w-96 h-8 border-2 border-solid border-gray-200 rounded"
            name="code"
            onChange={handleChange}
            value={inputValue.code}
          />
          <br />
          {error.code && (
            <span style={{ color: "red", fontSize: 14 }}>{error.code}</span>
          )}
          <br />
          <p>Danh mục </p>
          <select
            name=""
            id=""
            className=" w-96 h-8 border-2 border-solid border-gray-200 rounded"
            value={inputValue.categoryId}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setInputValue({
                ...inputValue,
                categoryId: Number(e.target.value),
              })
            }
          >
            <option value={0}>Chọn danh mục</option>
            {categoryData.map((category: any) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddOrUpdateProduct}>
            {editMode ? "Cập nhật" : "Thêm sản phẩm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

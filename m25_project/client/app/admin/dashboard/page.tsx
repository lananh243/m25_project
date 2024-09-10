"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHomeLg, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { faPager } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faPanorama } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Button, Modal } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function page() {
  const [admin, setAdmin] = useState<any>([]);
  const route = useRouter();
  // // kiểm tra xem đã đăng nhập hay chưa
  // let check = localStorage.getItem("admin");
  // if (!check) {
  //   route.push("/login_admin");
  // }
  // Kiểm tra xem đã đăng nhập hay chưa
  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    if (!adminData) {
      route.push("/login_admin");
    } else {
      setAdmin(JSON.parse(adminData));
    }
  }, [route]);
  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleLogout = () => {
    setShow(true);
  };
  const handleMove = () => {
    setShow(false);
    localStorage.removeItem("admin");
    route.push("/login_admin");
    setAdmin(null);
  };
  const handleUser = () => {
    route.push("/admin/users");
  };
  const handleProduct = () => {
    route.push("/admin/products");
  };
  return (
    <div className="flex h-screen">
      {/* Menu */}
      <div className="w-1/4 bg-rose-600">
        <div className="py-14 flex justify-center">
          <span className="text-xl font-bold">Quản lí</span>
        </div>
        <div className="w-52 m-auto py-12">
          <div className="flex items-center ">
            <FontAwesomeIcon
              icon={faHomeLg}
              className="w-6 h-6"
            ></FontAwesomeIcon>
            <span className="mx-5">Trang chủ</span>
          </div>
          <div
            className="flex items-center my-14 hover:bg-gray-50 hover:cursor-pointer h-9 rounded"
            onClick={handleUser}
          >
            <FontAwesomeIcon
              icon={faUserGroup}
              className="w-6 h-6"
            ></FontAwesomeIcon>
            <span className="mx-5 whitespace-nowrap ">Quản lí user</span>
          </div>
          <div className="flex items-center my-14">
            <FontAwesomeIcon
              icon={faCalendarPlus}
              className="w-6 h-6"
            ></FontAwesomeIcon>
            <span className="mx-5 whitespace-nowrap">Quản lí danh mục</span>
          </div>
          <div
            className="flex items-center my-14 hover:bg-gray-50 hover:cursor-pointer h-9 rounded"
            onClick={handleProduct}
          >
            <FontAwesomeIcon
              icon={faPager}
              className="w-6 h-6"
            ></FontAwesomeIcon>
            <span className="mx-5 whitespace-nowrap">Quản lí sản phẩm</span>
          </div>
        </div>
        <div className="w-52 m-auto my-14" onClick={handleLogout}>
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faRightToBracket}
              className="w-6 h-6"
            ></FontAwesomeIcon>
            <span className="mx-5 py-12">Đăng xuất</span>
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
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              />
            </div>
            <div className="flex items-center gap-7">
              <FontAwesomeIcon
                icon={faBell}
                className="w-6 h-6"
              ></FontAwesomeIcon>
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
        <div className="flex justify-between py-10 w-11/12 m-auto">
          <div className="w-80 bg-blue-400 rounded">
            <h1 className="text-3xl mx-6 py-4 text-white">Sign up</h1>
            <div className="w-64 m-auto justify-between flex">
              <div></div>
              <span className="text-4xl font-bold text-white">128</span>
            </div>
            <div className="w-64 m-auto justify-between flex my-3 ">
              <FontAwesomeIcon
                icon={faUser}
                className="w-6 h-6 text-white"
              ></FontAwesomeIcon>
              <b className="text-white">+43 % </b>
            </div>
          </div>
          <div className="w-80 bg-orange-300 rounded">
            <h1 className="text-3xl mx-6 py-4 text-white">Revenue</h1>
            <div className="w-64 m-auto justify-between flex">
              <div></div>
              <span className="text-4xl font-bold text-white">$267,168</span>
            </div>
            <div className="w-64 m-auto justify-between flex my-3">
              <FontAwesomeIcon
                icon={faCartPlus}
                className="w-6 h-6 text-white"
              ></FontAwesomeIcon>
              <b className="text-white">+80 % </b>
            </div>
          </div>
          <div className="w-80 bg-rose-300 rounded">
            <h1 className="text-3xl mx-6 py-4 text-white">Product sold</h1>
            <div className="w-64 m-auto justify-between flex">
              <div></div>
              <span className="text-4xl font-bold text-white">1578</span>
            </div>
            <div className="w-64 m-auto justify-between flex my-3">
              <FontAwesomeIcon
                icon={faPanorama}
                className="w-6 h-6 text-white"
              ></FontAwesomeIcon>
              <b className="text-white">+20 % </b>
            </div>
          </div>
        </div>
        <div className="">
          <CardContent className="h-40">
            <ChartContainer config={chartConfig} className="h-80 w-full">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Đăng xuất</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn đăng xuất tài khoản Admin ko ??</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleMove}>
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

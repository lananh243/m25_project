import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCartProductById: any = createAsyncThunk(
    "carts/getCartProductById",
    async (id: number) => {
        const response = await axios.get(
            `http://localhost:8080/carts?idUser=${id}`
        );
        return response.data;
    }
);

export const addToCart: any = createAsyncThunk(
    "carts/addToCart",
    async (data: any) => {
        const response = await axios.post(`http://localhost:8080/carts`, data);
        return response.data;
    }
);

export const updateCart: any = createAsyncThunk(
    "carts/updateCart",
    async (cart: any) => {
        const response = await axios.patch(
            `http://localhost:8080/carts/${cart.id}`,
            cart
        );
        return response.data;
    }
);


export const updateCartQuantity = createAsyncThunk(
    'carts/updateCartQuantity',
    async ({ id, product }: { id: number; product: any }) => {
        // Gửi yêu cầu cập nhật toàn bộ thông tin sản phẩm, bao gồm số lượng
        const response = await axios.patch(`http://localhost:8080/carts/${id}`, {
            products: {
                ...product // Gửi toàn bộ thông tin sản phẩm
            }
        });
        return response.data;
    }
);



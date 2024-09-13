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

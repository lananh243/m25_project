import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getAllProduct: any = createAsyncThunk(
    "products/getAllProduct",
    async () => {
        const response = await axios.get("http://localhost:8080/products");
        return response.data
    }
)


export const addNewProduct: any = createAsyncThunk(
    "products/addNewProduct",
    async (product: any) => {
        let response: any = await axios.post("http://localhost:8080/products", product)
        return response.data
    }
)

export const searchNameProduct: any = createAsyncThunk("products, searchNameProduct",
    async (name: any) => {
        let response = await axios.get(`http://localhost:8080/products?nameProduct_like=${name}`)
        return response.data
    }
)

export const sortProduct: any = createAsyncThunk("products, sortProduct",
    async (order: 'asc' | 'desc') => {
        let response = await axios.get(`http://localhost:8080/products?_sort=nameProduct&_order=${order}`)
        return response.data
    }
)

export const deleteProduct: any = createAsyncThunk("products, deleteProduct",
    async (id: number) => {
        let response = await axios.delete(`http://localhost:8080/products/${id}`);
        return id;
    }
)

export const editProduct: any = createAsyncThunk("products, editProduct",
    async (product: any) => {
        let response: any = await axios.put(`http://localhost:8080/products/${product.id}`, product)
        return response.data
    }
)
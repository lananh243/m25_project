import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCategory: any = createAsyncThunk(
    "categorys/getAllCategory",
    async () => {
        const response = await axios.get("http://localhost:8080/categorys")
        return response.data
    }
)

export const searchNameCategory: any = createAsyncThunk("categorys/searchNameCategory",
    async (name: any) => {
        let response = await axios.get(`http://localhost:8080/categorys?name_like=${name}`)
        return response.data
    }
)

export const sortNameCategory: any = createAsyncThunk("categorys/sortNameCategory",
    async (order: 'asc' | 'desc') => {
        const response = await axios.get(`http://localhost:8080/categorys?_sort=name&_order=${order}`)
        return response.data
    }
)

export const addCategory: any = createAsyncThunk("categorys/addCategory",
    async (category: any) => {
        let response: any = await axios.post("http://localhost:8080/categorys", category)
        return response.data
    }
)

export const editCategory: any = createAsyncThunk("categorys/editCategory",
    async (category: any) => {
        let response: any = await axios.put(`http://localhost:8080/categorys/${category.id}`, category)
        return response.data
    }
)

export const deleteCategory: any = createAsyncThunk("categorys/deleteCategory",
    async (id: number) => {
        let response = await axios.delete(`http://localhost:8080/categorys/${id}`);
        return id
    }
)
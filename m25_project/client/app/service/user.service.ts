import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUser: any = createAsyncThunk(
    "users/getAllUser",
    async () => {
        const response = await axios.get("http://localhost:8080/users");
        return response.data
    }
)

export const searchUser: any = createAsyncThunk(
    "users/searchUser",
    async (name: any) => {
        let response = await axios.get(`http://localhost:8080/users?name_like=${name}`)
        return response.data
    }
)

export const sortUser: any = createAsyncThunk(
    "users/sortUser",
    async (order: 'asc' | 'desc') => {
        const response = await axios.get(`http://localhost:8080/users?_sort=name&_order=${order}`)
        return response.data
    }
)

export const addUser: any = createAsyncThunk(
    "users/addUser",
    async (user: any) => {
        let response: any = await axios.post("http://localhost:8080/users", user)
        return response.data
    }
)

export const toggleUserStatus: any = createAsyncThunk(
    "users/toggleUserStatus",
    async ({ id, currentStatus }: { id: number; currentStatus: boolean }) => {
        // Đảo ngược trạng thái hiện tại
        const newStatus = !currentStatus;

        // Gửi yêu cầu cập nhật trạng thái tới API
        const response = await axios.patch(`http://localhost:8080/users/${id}`, {
            active: newStatus,
        });

        // Trả về dữ liệu đã được cập nhật
        return response.data;
    }
);


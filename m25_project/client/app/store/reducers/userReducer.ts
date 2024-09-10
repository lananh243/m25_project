import { addUser, getAllUser, searchUser, sortUser, toggleUserStatus } from "@/app/service/user.service";
import { createSlice } from "@reduxjs/toolkit";

const userState: any = [];
const userReducer = createSlice({
    name: "user",
    initialState: {
        users: userState
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getAllUser.fulfilled, (state, action) => {
                state.users = action.payload
            })
            .addCase(searchUser.fulfilled, (state, action) => {
                state.users = action.payload
            })
            .addCase(sortUser.fulfilled, (state, action) => {
                state.users = action.payload
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload)
            })
            .addCase(toggleUserStatus.fulfilled, (state, action) => {
                const updatedUser = action.payload;
                // Cập nhật người dùng trong danh sách dựa trên id
                state.users = state.users.map((user: any) =>
                    user.id === updatedUser.id ? updatedUser : user
                );
            })
    },
})
export default userReducer.reducer
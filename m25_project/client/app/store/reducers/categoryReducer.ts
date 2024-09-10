import { addCategory, deleteCategory, getAllCategory, searchNameCategory, sortNameCategory } from "@/app/service/category.service";
import { editProduct } from "@/app/service/product.service";
import { createSlice } from "@reduxjs/toolkit";

const categoryState: any = [];
const categoryReducer = createSlice({
    name: "category",
    initialState: {
        categorys: categoryState
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getAllCategory.fulfilled, (state, action) => {
                state.categorys = action.payload
            })
            .addCase(searchNameCategory.fulfilled, (state, action) => {
                state.categorys = action.payload
            })
            .addCase(sortNameCategory.fulfilled, (state, action) => {
                state.categorys = action.payload
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.categorys.push(action.payload)
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                let index = state.categorys.findIndex((category: any) => {
                    return category.id === action.payload.id
                })
                if (index !== -1) {
                    state.categorys[index] = action.payload
                }
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categorys = state.categorys.filter((category: any) => {
                    return category.id !== action.payload
                })
            })
    },
})
export default categoryReducer.reducer;
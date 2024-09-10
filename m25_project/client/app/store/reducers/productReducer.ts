import { addNewProduct, deleteProduct, editProduct, getAllProduct, getCategory, searchNameProduct, sortProduct } from "@/app/service/product.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const productState: any = [];
const categoryState: any = [];

const productReducer = createSlice({
    name: "product",
    initialState: {
        products: productState,
        categorys: categoryState,
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(addNewProduct.fulfilled, (state, action) => {
                state.products.push(action.payload)
            })
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.products = action.payload
            })
            .addCase(searchNameProduct.fulfilled, (state, action) => {
                state.products = action.payload
            })
            .addCase(sortProduct.fulfilled, (state, action) => {
                state.products = action.payload
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter((product: any) => {
                    return product.id !== action.payload
                })
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                let index = state.products.findIndex((product: any) => {
                    return product.id === action.payload.id
                })
                if (index !== -1) {
                    state.products[index] = action.payload
                }
            })
    },
})
export default productReducer.reducer;
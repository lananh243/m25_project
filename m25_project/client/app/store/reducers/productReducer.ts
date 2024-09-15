import { addNewProduct, deleteProduct, editProduct, filterProductsByCategory, filterProductsByPriceRange, getAllProduct, getProductById, getProductsByCategory, getProductsWithPagination, searchNameProduct, sortProduct, sortProductByPrice } from "@/app/service/product.service";
import { createSlice } from "@reduxjs/toolkit";
const productState: any = [];
const categoryState: any = [];
const productReducer = createSlice({
    name: "product",
    initialState: {

        products: productState,
        categorys: categoryState,
        productDetail: [],
        filteredProducts: [],
        currentPage: 1,
        totalPages: 1,
        totalProducts: 0,
    },
    reducers: {
        setMaxPrice: (state: any, action) => {
            state.maxPrice = action.payload;
        },
        applyPriceFilter: (state) => {
            state.filteredProducts = state.products.filter(
                (product: any) => product.price <= state.maxPrice
            );
        },
        setProducts: (state, action) => {
            state.products = action.payload;
            state.filteredProducts = action.payload;
        },
    },
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
            .addCase(sortProductByPrice.fulfilled, (state, action) => {
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
            .addCase(getProductById.fulfilled, (state, action) => {
                console.log(action.payload)
                state.productDetail = action.payload
            })
            .addCase(getProductsWithPagination.fulfilled, (state, action) => {
                state.products = action.payload.products;
                state.totalProducts = action.payload.total;
                state.totalPages = Math.ceil(action.payload.total / 10); // Giả sử mỗi trang có 10 sản phẩm
            })
            .addCase(filterProductsByPriceRange.fulfilled, (state: any, action) => {
                state.filteredProducts = action.payload
            })
            .addCase(getProductsByCategory.fulfilled, (state, action) => {
                state.products = action.payload
            })

    },
})
export const { setMaxPrice, applyPriceFilter, setProducts } = productReducer.actions;
export default productReducer.reducer;
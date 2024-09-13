
import { addToCart, getCartProductById, updateCart } from "@/app/service/cart.service";
import { createSlice } from "@reduxjs/toolkit";

const cartState: any = []

const cartReducer = createSlice({
    name: "cart",
    initialState: {
        carts: cartState,
    },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getCartProductById.fulfilled, (state, action) => {
            state.carts = action.payload;
        })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.carts.push(action.payload)
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                const update = state.carts.findIndex((item: any) => item.id === action.payload.id);
                if (update !== -1) {
                    state.carts[update].products.quantity = action.payload.products.quantity
                }
            })
    },
})

export default cartReducer.reducer

import { addToCart, getCartProductById, updateCart, updateCartQuantity } from "@/app/service/cart.service";
import { createSlice } from "@reduxjs/toolkit";

const cartState: any = []

const cartReducer = createSlice({
    name: "cart",
    initialState: {
        carts: cartState,
        items: [],
        checkedItems: new Set(),
    },
    reducers: {
    },
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
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                const { id, products } = action.payload;
                const productIndex = state.carts.findIndex(
                    (cartItem: any) => cartItem.id === id
                );
                if (productIndex !== -1) {
                    state.carts[productIndex].products.quantity = products.quantity;
                }
            })

    },
})
export default cartReducer.reducer
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import categoryReducer from "./reducers/categoryReducer";
import userReducer from "./reducers/userReducer";
import cartReducer from "./reducers/cartReducer";

const store = configureStore({
    reducer: {
        productReducer,
        categoryReducer,
        userReducer,
        cartReducer
    }
})
export type AppDispatch = typeof store.dispatch;
export default store;
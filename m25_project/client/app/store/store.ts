import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import categoryReducer from "./reducers/categoryReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
    reducer: {
        productReducer,
        categoryReducer,
        userReducer
    }
})
export default store;
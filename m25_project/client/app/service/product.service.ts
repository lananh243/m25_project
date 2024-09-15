import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

interface Product {
    id: number;
    name: string;
    price: number;
}
export const getProductById: any = createAsyncThunk(
    "products/getProductById",
    async (id: number) => {
        const response = await axios.get(`http://localhost:8080/products/${id}`)
        return response.data
    }
)
export const getAllProduct: any = createAsyncThunk(
    "products/getAllProduct",
    async () => {
        const response = await axios.get("http://localhost:8080/products");
        return response.data
    }
)


export const addNewProduct: any = createAsyncThunk(
    "products/addNewProduct",
    async (product: any) => {
        let response: any = await axios.post("http://localhost:8080/products", product)
        return response.data
    }
)

export const searchNameProduct: any = createAsyncThunk("products, searchNameProduct",
    async (name: any) => {
        let response = await axios.get(`http://localhost:8080/products?nameProduct_like=${name}`)
        return response.data
    }
)

export const sortProduct: any = createAsyncThunk("products, sortProduct",
    async (order: 'asc' | 'desc') => {
        let response = await axios.get(`http://localhost:8080/products?_sort=nameProduct&_order=${order}`)
        return response.data
    }
)

export const sortProductByPrice = createAsyncThunk<Product[], string>(
    'products/sortByPrice',
    async (order: string, { getState }) => {
        const state: any = getState();
        const products: Product[] = state.productReducer.products;
        const sortedProducts = [...products].sort((a: Product, b: Product) => {
            return order === 'asc' ? a.price - b.price : b.price - a.price;
        });

        return sortedProducts;
    }
);

export const deleteProduct: any = createAsyncThunk("products, deleteProduct",
    async (id: number) => {
        let response = await axios.delete(`http://localhost:8080/products/${id}`);
        return id;
    }
)

export const editProduct: any = createAsyncThunk("products, editProduct",
    async (product: any) => {
        let response: any = await axios.put(`http://localhost:8080/products/${product.id}`, product)
        return response.data
    }
)


// Thunk để lấy sản phẩm với phân trang
export const getProductsWithPagination = createAsyncThunk(
    "products/getProductsWithPagination",
    async ({ page = 1, limit = 10 }: { page: number; limit: number }) => {
        const response = await axios.get(`http://localhost:8080/products?_page=${page}&_limit=${limit}`);
        return {
            products: response.data,
            total: parseInt(response.headers['x-total-count'], 10) // Giả sử API trả về tổng số sản phẩm qua header
        };
    }
);
// Lọc theo giá 
interface Product {
    id: number;
    name: string;
    price: number;
}

interface FilterParams {
    minPrice: number;
    maxPrice: number;
}

export const filterProductsByPriceRange = createAsyncThunk<Product[], FilterParams>(
    'products/filterProductsByPriceRange',
    async ({ minPrice, maxPrice }) => {
        const response = await axios.get('http://localhost:8080/products');
        const products = response.data as Product[];
        // Filter products based on the price range
        const filteredProducts = products.filter(
            (product) => product.price >= minPrice && product.price <= maxPrice
        );
        return filteredProducts;
    }
);

// Lấy sản phẩm theo danh mục
export const getProductsByCategory = createAsyncThunk(
    "products/getProductsByCategory",
    async (categoryId: number) => {
        try {
            const response = await axios.get(`http://localhost:8080/products?categoryId=${categoryId}`);
            return response.data;
        } catch (error) {
            throw new Error("Failed to fetch products");
        }
    }
);
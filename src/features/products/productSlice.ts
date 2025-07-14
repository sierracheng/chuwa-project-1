import { createSlice } from "@reduxjs/toolkit";
import type { IProduct } from "../../back-end/models/Product";
import type { RootState } from "../../app/store";

interface ProductsState {
  products: IProduct[];
  currentPage: number;
  totalPages: number;
}

const initialState: ProductsState = {
  products: [],
  currentPage: 1,
  totalPages: 1,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});

export const { setProducts, setCurrentPage, setTotalPages } =
  productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.products;
export const selectCurrentPage = (state: RootState) =>
  state.products.currentPage;
export const selectTotalPage = (state: RootState) => state.products.totalPages;

export default productsSlice.reducer;

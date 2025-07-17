import { createSlice } from "@reduxjs/toolkit";
import type { IProduct } from "../../back-end/models/Product";
import type { RootState } from "../../app/store";

interface ProductsState {
  products: IProduct[];
  currentPage: number;
  totalPages: number;
  sortOption: string;
  search: string;
}

const initialState: ProductsState = {
  products: [],
  currentPage: 1,
  totalPages: 1,
  sortOption: "lastAdded",
  search: "",
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
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const {
  setProducts,
  setCurrentPage,
  setTotalPages,
  setSortOption,
  setSearch,
} = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.products;
export const selectCurrentPage = (state: RootState) =>
  state.products.currentPage;
export const selectTotalPage = (state: RootState) => state.products.totalPages;
export const selectSortOption = (state: RootState) => state.products.sortOption;
export const selectSearch = (state: RootState) => state.products.search;

export default productsSlice.reducer;

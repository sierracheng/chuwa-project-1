import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { applyCouponThunk } from "./couponThunk";

interface CouponState {
  couponCode: string;
  discountTotal: number;
  discountRate: number;
  discountApplied: boolean;
}

const initialState: CouponState = {
  couponCode: "",
  discountTotal: 0,
  discountRate: 0,
  discountApplied: false,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    resetCoupon: (state) => {
      state.couponCode = "";
      state.discountTotal = 0;
      state.discountRate = 0;
      state.discountApplied = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      applyCouponThunk.fulfilled,(state, action) => {
        state.couponCode = action.payload.couponCode;
        state.discountTotal = action.payload.discountTotal;
        state.discountRate = action.payload.discountRate;
      });
    },
});

export const { resetCoupon } = couponSlice.actions;

export const selectCoupon = (state: RootState) => state.coupon;

export default couponSlice.reducer;
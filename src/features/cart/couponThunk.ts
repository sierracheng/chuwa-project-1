import {createAsyncThunk} from '@reduxjs/toolkit';
import { applyCouponAPI } from '../../back-end/APITesting/Product';

export const applyCouponThunk = createAsyncThunk(
  'cart/applyCoupon',
  async (
    { CouponCode, price }: { CouponCode: string; price: number },
    { rejectWithValue } 
  ) => {
    const res = await applyCouponAPI(CouponCode, price);
    if (res.success) {
      // console.log('Coupon applied successfully:', res.data);
      return res.data.discounts;
    }
    return rejectWithValue(res.error? res.error : 'Failed to apply coupon');
  }
);

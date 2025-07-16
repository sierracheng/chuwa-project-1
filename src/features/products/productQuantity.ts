import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

export interface ProductQuantityState {
    quantity: number | null;
}

// Define the initial state using that type
const initialState: ProductQuantityState = {
    quantity: null,

}

export const ProductQuantitySlice = createSlice({
    name: "productQuantity",
    initialState,
    reducers: {
        increment(state) {
            // if it was null, go to 1; otherwise +1
            state.quantity = state.quantity === null
                ? 1
                : state.quantity + 1;
        },
        decrement(state) {
            if (state.quantity !== null) {
                state.quantity = Math.max(1, state.quantity - 1);
            }
        },
        setQuantity(state, action: PayloadAction<number | null>) {
            state.quantity = action.payload;
        },
    }
})

export const { increment, decrement, setQuantity } = ProductQuantitySlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectQuantity = (state: RootState) => state.productQuantity.quantity

export default ProductQuantitySlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface ProductCart {
    price: number,
    quantity: number;
}

type ProductsInCart = Record<string, ProductCart>

export interface CartState {
    total: number;
    productsInCart: ProductsInCart;
}

// Define the initial state using that type
const initialState: CartState = {
    total: 0,
    productsInCart: {},
}
export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        increment(state, action: PayloadAction<{ id: string, price: number }>) {
            // if it was null, go to 1; otherwise +1

            const { id, price } = action.payload
            if (state.productsInCart[id]) {
                // const updatedProduct = {
                //     id: product.id,
                //     price: product.price,
                //     quantity: (state.productsInCart[product.id].quantity + 1)
                // }
                state.productsInCart[id].quantity += 1
            }
            else {
                state.productsInCart[id] = {
                    price: price,
                    quantity: 1,
                }
            }
            state.total += price;
        },
        decrement(state, action: PayloadAction<{ id: string }>) {
            const { id } = action.payload
            if (state.productsInCart[id]) {
                // const updatedProduct = {
                //     id: product.id,
                //     price: product.price,
                //     quantity: (state.productsInCart[product.id].quantity + 1)
                // }
                state.productsInCart[id].quantity = Math.max(0, state.productsInCart[id].quantity - 1)
                state.total -= state.productsInCart[id].price;
            }

        },
    }
})

export const { increment, decrement } = CartSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectProductsInCart = (state: RootState) => state.cart.productsInCart

export default CartSlice.reducer
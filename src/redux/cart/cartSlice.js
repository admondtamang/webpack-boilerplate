import { createSlice } from "@reduxjs/toolkit";
import { addItemTocart, removeItemfromCart, increaseCartItem, decreaseCartItem } from "./cartUtils";
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
    },
    reducers: {
        ADD_TO_CART: (state, action) => {
            return {
                ...state,
                cartItems: addItemTocart(state.cartItems, action.payload),
            };
        },
        REMOVE_FROM_CART: (state, action) => {
            return {
                ...state,
                cartItems: removeItemfromCart(state.cartItems, action.payload),
            };
        },
        INCREASE_CART: (state, action) => {
            return {
                ...state,
                cartItems: increaseCartItem(state.cartItems, action.payload),
            };
        },
        DECREASE_CART: (state, action) => {
            return {
                ...state,
                cartItems: decreaseCartItem(state.cartItems, action.payload),
            };
        },
    },
});

export const { ADD_TO_CART, REMOVE_FROM_CART, INCREASE_CART, DECREASE_CART } = cartSlice.actions;
export default cartSlice.reducer;

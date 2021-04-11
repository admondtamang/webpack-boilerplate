import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAddToCart } from "../../helpers/Requests";

export const fetchAddTocart = createAsyncThunk("addtocart/fetchAddTocart", async ({ cust_id, guest_id }) => {
    const response = await getAddToCart(cust_id, guest_id);
    return response.data;
});

const cartapiSlice = createSlice({
    name: "homePage",
    initialState: {
        data: {
            cart: [],
        },
        status: null,
        isloading: false,
    },
    reducers: {
        clear_cart: (state, action) => {
            return {
                ...state,
                data: {
                    cart: [],
                },
            };
        },
    },
    extraReducers: {
        [fetchAddTocart.pending]: (state, action) => {
            state.isloading = true;
            state.status = "loading";
        },
        [fetchAddTocart.fulfilled]: (state, { payload }) => {
            state.data = payload;
            state.isloading = false;
            state.status = "success";
        },
        [fetchAddTocart.rejected]: (state, action) => {
            state.isloading = false;
            state.status = "failed";
        },
    },
});

export const { clear_cart } = cartapiSlice.actions;
export default cartapiSlice.reducer;

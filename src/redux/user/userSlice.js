import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getGuestID } from "../../helpers/Requests";
import { fetchAddTocart } from "../cartAPI/cartapiSlice";

export const fetchGuestCustomer = createAsyncThunk("addtocart/fetchGuestCustomer", async (id, { getState, dispatch }) => {
    const { guest_id, data } = getState().user;

    if (guest_id === "") {
        const res = await getGuestID();
        // dispatch(fetchAddTocart({ cust_id: data.customer_id, guest_id: res.data.customer }));
        // console.error("err", res.data.customer);
        return res.data.customer;
    } else return guest_id;
});

const user = createSlice({
    name: "user",
    initialState: {
        data: {},
        guest_id: "",
    },

    reducers: {
        addUser: (state, action) => {
            return {
                ...state,
                data: action.payload,
            };
        },
        removeUser: (state, action) => {
            return {
                ...state,
                data: {},
            };
        },
    },
    extraReducers: {
        [fetchGuestCustomer.pending]: (state, action) => {
            state.isloading = true;
            state.status = "loading";
        },
        [fetchGuestCustomer.fulfilled]: (state, { payload }) => {
            state.guest_id = payload;
            state.status = "success";
        },
        [fetchGuestCustomer.rejected]: (state, action) => {
            state.status = "failed";
        },
    },
});

export const { addUser, removeUser } = user.actions;
// export const { ADD_TO_CART, REMOVE_FROM_CART } = user.actions;
export default user.reducer;

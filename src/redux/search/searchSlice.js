import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchSearchData = createAsyncThunk("search/fetchSearchData", async (searchTerms, thunkAPI) => {
    const source = axios.CancelToken.source();
    thunkAPI.signal.addEventListener("abort", () => {
        source.cancel();
    });
    const res = await axios({
        method: "GET",
        url: `https://v3be.infi.store/wp-json/api/v1/products?per_page=6&search=${searchTerms}`,
        cancelToken: source.token,
    });

    return res.data;
});

const searchSlice = createSlice({
    name: "search",
    initialState: {
        data: [],
        status: null,
    },
    extraReducers: {
        [fetchSearchData.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchSearchData.fulfilled]: (state, { payload }) => {
            state.data = payload;
            state.status = "success";
        },
        [fetchSearchData.rejected]: (state, action) => {
            state.status = "failed";
        },
    },
});

export default searchSlice.reducer;

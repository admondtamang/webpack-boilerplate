import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHomePageData } from "../../helpers/Requests";

export const getHomePage = createAsyncThunk("homepage/getHomePage", async () => {
    const response = await getHomePageData();
    return response.data;
});

const homePageSlice = createSlice({
    name: "homePage",
    initialState: {
        data: {},
        status: null,
    },
    extraReducers: {
        [getHomePage.pending]: (state, action) => {
            state.status = "loading";
        },
        [getHomePage.fulfilled]: (state, { payload }) => {
            state.data = payload;
            state.status = "success";
        },
        [getHomePage.rejected]: (state, action) => {
            state.status = "failed";
        },
    },
});

export default homePageSlice.reducer;

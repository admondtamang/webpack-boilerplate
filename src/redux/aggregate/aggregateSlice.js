import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAggregateData } from "../../helpers/Requests";

export const getAggregate = createAsyncThunk("aggregate/getaggregate", async () => {
    const response = await getAggregateData();
    return response.data;
});

const aggregateSlice = createSlice({
    name: "aggregate",
    initialState: {
        data: {},
        status: null,
    },
    extraReducers: {
        [getAggregate.pending]: (state, action) => {
            state.status = "loading";
        },
        [getAggregate.fulfilled]: (state, { payload }) => {
            state.data = payload;
            state.status = "success";
        },
        [getAggregate.rejected]: (state, action) => {
            state.status = "failed";
        },
    },
});

export default aggregateSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCampaign } from "../../helpers/Requests";

export const fetchCampaign = createAsyncThunk("campaign/fetchCampaign", async () => {
    const response = await getCampaign();
    return response.data;
});

const campaignSlice = createSlice({
    name: "campaign",
    initialState: {
        data: {},
        status: null,
    },
    extraReducers: {
        [fetchCampaign.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchCampaign.fulfilled]: (state, { payload }) => {
            state.data = payload;
            state.status = "success";
        },
        [fetchCampaign.rejected]: (state, action) => {
            state.status = "failed";
        },
    },
});

export default campaignSlice.reducer;

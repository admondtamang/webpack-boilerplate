import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSubCategories } from "../../helpers/Requests";

export const fetchSubCategories = createAsyncThunk("catArchive/fetchSubCategories", async (id) => {
    const res = await getSubCategories(id);
    return res.data;
});

const subCategoriesSlice = createSlice({
    name: "subCategories",
    initialState: {
        data: [],
        status: null,
    },
    extraReducers: {
        [fetchSubCategories.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchSubCategories.fulfilled]: (state, { payload }) => {
            state.data = payload;
            state.status = "success";
        },
        [fetchSubCategories.rejected]: (state, action) => {
            state.status = "failed";
        },
    },
});

export default subCategoriesSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFeaturedProducts, getHighProducts, getLowProducts, getLatestProducts } from "../../helpers/Requests";

export const fetchCatArchive = createAsyncThunk("catArchive/fetchCatArchive", async (req, { getState, dispatch }) => {
    const { type, request: request_sort, cat_id, search, filtered } = req;

    const { page, data, hasMore } = getState().catArchive;

    let request, type_request, type_change, cat_change, sort_change;

    type_change = type;
    cat_change = cat_id;
    sort_change = request_sort;
    // For Categories product
    switch (type) {
        case "category":
            type_request = "&category=" + cat_id;
            console.log("category", cat_id, page);
            break;
        case "filter":
            type_request = "&filtered=";
            console.log("FIltered data", filtered[0], filtered[1], page);
            break;
        default:
            type_request = "";
            console.log("all products");
            break;
    }
    // Reset Page If type changes

    console.log("sor --", sort_change, type_change);
    if (type_change !== type || sort_change !== sort_change) {
        dispatch(restPage());
        dispatch(resetData());
        alert("changed", page);
        console.log("Changed page --------", page);
    }
    console.log("page --------", page);

    switch (request_sort) {
        case "latest":
            request = getLatestProducts(page, type_request);
            break;
        case "featured":
            request = getFeaturedProducts(page, type_request);
            break;
        case "low":
            request = getLowProducts(page, type_request);
            break;
        case "high":
            request = getHighProducts(page, type_request);
            break;
    }

    // Request
    const res = await request;
    console.log("The data :", res);

    dispatch(moreData());
    // console.log("page -----------", page, req?.headers["x-wp-totalpages"]);

    //   Check last page:  current page = last page then return null
    // if (req && page < req?.headers["x-wp-totalpages"]) {
    //     dispatch(addDataToAray(req.data));
    //     dispatch(hasMore());
    //     return res.data;
    // }
    // return dispatch(addDataToAray(res.data));

    return res.data;
});

const catArchiveSlice = createSlice({
    name: "catArchive",
    initialState: {
        data: [],
        hasMore: false,
        status: null,
        page: 1,
    },
    reducers: {
        restPage: (state) => {
            return {
                ...state,
                page: 1,
            };
        },
        restData: (state) => {
            return {
                ...state,
                data: [],
            };
        },
        increasePage: (state, action) => {
            return {
                ...state,
                page: state.page + 1,
            };
        },
        moreData: (state, action) => {
            return {
                ...state,
                hasMore: true,
            };
        },
        addDataToAray: (state, { payload }) => {
            return {
                ...state,
                data: [...state.data, ...payload],
            };
        },
    },
    extraReducers: {
        [fetchCatArchive.pending]: (state, action) => {
            state.status = "loading";
        },
        [fetchCatArchive.fulfilled]: (state, { payload }) => {
            if (state.hasMore) {
                state.data = [...state.data, ...payload];
            } else {
                state.data = payload;
            }
            state.status = "success";
        },
        [fetchCatArchive.rejected]: (state, action) => {
            state.status = "failed";
        },
    },
});
export const { increasePage, moreData, restPage, resetData, addDataToAray } = catArchiveSlice.actions;
export default catArchiveSlice.reducer;

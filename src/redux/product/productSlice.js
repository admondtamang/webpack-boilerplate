import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSingleProduct } from "../../helpers/Requests";

// export const getSearchData = createAsyncThunk("search/getSearchData", async () => {
//     const response = await getHomePageData();

//     return response.data;
// });

export const getProduct = createAsyncThunk("product/getProduct", async (id) => {
  const res = await getSingleProduct(id);
  return res.data;
});

export const getProductVariations = createAsyncThunk(
  "product/getProductVariation",
  async (id) => {
    const res = await getProductVariations(id);
    return res.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: {},
    status: null,
    productVariations: {
      data: {},
      status: null,
    },
  },
  reducers: {
    addVariationProdct: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
  extraReducers: {
    [getProduct.pending]: (state, action) => {
      state.status = "loading";
    },
    [getProduct.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.status = "success";
    },
    [getProduct.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getProductVariations.pending]: (state, action) => {
      state.productVariations.status = "loading";
    },
    [getProductVariations.fulfilled]: (state, { payload }) => {
      state.productVariations.data = payload;
      state.productVariations.status = "success";
    },
    [getProductVariations.rejected]: (state, action) => {
      state.productVariations.status = "failed";
    },
  },
});

export const { addVariationProdct } = productSlice.actions;
export default productSlice.reducer;

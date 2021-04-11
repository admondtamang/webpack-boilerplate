import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import subCategoriesSlice from "./catArchive/subCategoriesSlice";
import cartSlice from "./cart/cartSlice";
import homePageSlice from "./homePage/homePageSlice";
import productSlice from "./product/productSlice";
import userSlice from "./user/userSlice";
import searchSlice from "./search/searchSlice";
import logger from "redux-logger";
import aggregateSlice from "./aggregate/aggregateSlice";
import campaignSlice from "./campaign/campaignSlice";
import cartapiSlice from "./cartAPI/cartapiSlice";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const reducer = combineReducers({
    cart: cartSlice,
    homePage: homePageSlice,
    aggregate: aggregateSlice,
    product: productSlice,
    subCat: subCategoriesSlice,
    search: searchSlice,
    user: userSlice,
    campaign: campaignSlice,
    cartApi: cartapiSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

// const store = configureStore({
//     reducer: reducer,
//     middleware: getDefaultMiddleware().concat(logger),
// });

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
    devTools: true,
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../rtk query/features/api/apiSlice";
import filterSlice from "../rtk query/features/filter/filterSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]:apiSlice.reducer,
        filter:filterSlice
    },
    middleware:(defaultMiddlewares) => (defaultMiddlewares().concat(apiSlice.middleware))
});

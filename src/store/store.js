import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./Features/newsSlice";
import tabReducer from "./Features/tabSlice";

export const store = configureStore({
    reducer: {
        news: newsReducer,
        tab: tabReducer,
    }
})
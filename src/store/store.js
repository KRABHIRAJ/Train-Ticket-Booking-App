import { configureStore } from "@reduxjs/toolkit";
import detailSlice from "./slices/detailSlice";

export const store = configureStore({
    reducer: detailSlice
})
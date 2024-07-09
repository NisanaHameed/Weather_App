import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slice/AuthSlice";

const store = configureStore({
    reducer: {
        Auth: AuthSlice
    }
});

export default store;
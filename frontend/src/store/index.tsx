import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cart";

export type RootState = ReturnType<typeof store.getState>;

export const store: any = configureStore({
    reducer: {
        cart: cartReducer,
    },
});
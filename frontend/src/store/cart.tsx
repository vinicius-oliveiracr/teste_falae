import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
    productId: number;
    quantity: number;
  }

const initialState = {
    items: [] as CartItem[],
    statuTab: false
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(
                (item) => item.productId === action.payload.productId
            );
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        changeQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
            const { productId, quantity } = action.payload;
            const existingItem = state.items.find(
                (item) => item.productId === productId
            );
            if (existingItem) {
                if (quantity > 0) {
                    existingItem.quantity = quantity;
                } else {
                    state.items = state.items.filter(item => item.productId !== productId);
                }
            }
        },
        toggleStatusTab(state){
            if(state.statuTab === false){
                state.statuTab = true
            }
            else{
                state.statuTab = false
            }
        }
    },
});

export const { addToCart, changeQuantity, toggleStatusTab } = cartSlice.actions;
export default cartSlice.reducer;
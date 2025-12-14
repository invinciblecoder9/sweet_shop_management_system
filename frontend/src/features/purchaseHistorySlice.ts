import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Purchase {
  id: number;
  sweetName: string;
  sweetPrice: number;
  purchasedAt: string;
}

interface PurchaseState {
  list: Purchase[];
}

const initialState: PurchaseState = {
  list: [],
};

const purchaseHistorySlice = createSlice({
  name: 'purchaseHistory',
  initialState,
  reducers: {
    setPurchases: (state, action: PayloadAction<Purchase[]>) => {
      state.list = action.payload;
    },
    addPurchase: (state, action: PayloadAction<Purchase>) => {
      state.list.unshift(action.payload); // Add to top
    },
  },
});

export const { setPurchases, addPurchase } = purchaseHistorySlice.actions;
export default purchaseHistorySlice.reducer;
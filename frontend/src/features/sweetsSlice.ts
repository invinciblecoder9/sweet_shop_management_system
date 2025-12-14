import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

interface SweetsState {
  list: Sweet[];
  loading: boolean;
}

const initialState: SweetsState = {
  list: [],
  loading: false,
};

const sweetsSlice = createSlice({
  name: 'sweets',
  initialState,
  reducers: {
    setSweets: (state, action: PayloadAction<Sweet[]>) => {
      state.list = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateSweetQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const sweet = state.list.find(s => s.id === action.payload.id);
      if (sweet) sweet.quantity = action.payload.quantity;
    },
  },
});

export const { setSweets, setLoading, updateSweetQuantity } = sweetsSlice.actions;
export default sweetsSlice.reducer;
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import sweetsReducer from '../features/sweetsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sweets: sweetsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
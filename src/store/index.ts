import { configureStore } from '@reduxjs/toolkit';
import goods from './slices/goods/slice';

const store = configureStore({
  reducer: {
    goods,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import goods from './slices/goodsSlice';

const store = configureStore({
  reducer: {
    goods,
  },
});

export default store;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGoodsSliceState, ISortItem, ResStatus } from './types';
import { addProduct, deleteProductById, fetchAllGoods, putProduct } from './asyncActions';

const initialState: IGoodsSliceState = {
  activeSort: {
    name: 'Alphabet 🠕',
    options: {
      sortBy: 'title',
      operation: 'asc',
    },
  },
  sortItems: [
    {
      name: 'Alphabet 🠕',
      options: {
        sortBy: 'title',
        operation: 'asc',
      },
    },
    {
      name: 'Alphabet 🠓',
      options: {
        sortBy: 'title',
        operation: 'desc',
      },
    },
    {
      name: 'Weight 🠕',
      options: {
        sortBy: 'weight',
        operation: 'asc',
      },
    },
    {
      name: 'Weight 🠓',
      options: {
        sortBy: 'weight',
        operation: 'desc',
      },
    },
  ],
  searchVal: '',
  items: [],
  status: ResStatus.LOADING,
};

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    setActiveSort(state, action: PayloadAction<ISortItem>) {
      state.activeSort = action.payload;
    },
    setSearchVal(state, action: PayloadAction<string>) {
      state.searchVal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllGoods.pending, (state) => {
      state.status = ResStatus.LOADING;
      state.items = [];
    });
    builder.addCase(fetchAllGoods.fulfilled, (state, action) => {
      state.status = ResStatus.CONFIRM;
      state.items = [...action.payload.goods];
    });
    builder.addCase(fetchAllGoods.rejected, (state) => {
      state.status = ResStatus.ERROR;
      state.items = [];
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
    builder.addCase(putProduct.fulfilled, (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        }
        return item;
      });
    });
    builder.addCase(deleteProductById.fulfilled, (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    });
  },
});

export default goodsSlice.reducer;
export const { setActiveSort, setSearchVal } = goodsSlice.actions;

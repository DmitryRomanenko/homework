import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import fetchData from '../../services';
import { sortItemsByAlphabet, sortItemsByWeight, searchItems } from '../../utils';

export const fetchAllGoods = createAsyncThunk('goods/fetchAllGoods', () => fetchData('goods', 'get'));
export const deleteProductById = createAsyncThunk('goods/deleteProductById', async (id) =>
  fetchData(`goods/${id}`, 'delete'),
);

export const addProduct = createAsyncThunk('goods/addProduct', async ({ title, description, weight }) =>
  fetchData(`goods/`, 'post', { title, description, weight }),
);
export const putProduct = createAsyncThunk('goods/putProduct', async ({ id, title, description, weight }) =>
  fetchData(`goods/${id}`, 'put', { title, description, weight }),
);

const initialState = {
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
  status: 'loading',
};

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    setActiveSort(state, action) {
      state.activeSort = action.payload;
    },
    setSearchVal(state, action) {
      state.searchVal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllGoods.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchAllGoods.fulfilled, (state, action) => {
      state.status = 'confirm';
      state.items = [...action.payload.goods];
    });
    builder.addCase(fetchAllGoods.rejected, (state) => {
      state.status = 'error';
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

export const selectActiveSort = (state) => state.goods.activeSort;
export const selectSortItems = (state) => state.goods.sortItems;
export const selectSearchVal = (state) => state.goods.searchVal;
export const selectGoodsStatus = (state) => state.goods.status;

export const selectSortedGoods = createSelector(
  (state) => state.goods.items,
  selectActiveSort,
  selectSearchVal,
  (goods, { options: { operation, sortBy } }, title) => {
    if (sortBy === 'weight') {
      const items = sortItemsByWeight(goods, operation, sortBy);
      return searchItems(items, title);
    }
    const items = sortItemsByAlphabet(goods, operation, sortBy);
    return searchItems(items, title);
  },
);

export default goodsSlice.reducer;
export const { deleteItem, addItem, setActiveSort, setSearchVal } = goodsSlice.actions;

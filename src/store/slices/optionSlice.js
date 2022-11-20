import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: ['All ToDos', 'In Progress', 'Completed'],
  activeFilter: 'Completed',
  sortItems: [
    {
      name: 'Creation(asc)',
      options: {
        sortBy: 'creationDate',
        operation: 'asc',
      },
    },
    {
      name: 'Creation(desc)',
      options: {
        sortBy: 'creationDate',
        operation: 'desc',
      },
    },
    {
      name: 'Update(asc)',
      options: {
        sortBy: 'updateDate',
        operation: 'asc',
      },
    },
    {
      name: 'Update(desc)',
      options: {
        sortBy: 'updateDate',
        operation: 'desc',
      },
    },
  ],
  activeSortItem: {
    name: 'Creation(asc)',
    options: {
      sortBy: 'creationDate',
      operation: 'asc',
    },
  },
};

const optionSlice = createSlice({
  name: 'option',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.activeFilter = action.payload;
    },
    setSort(state, action) {
      state.activeSortItem = action.payload;
    },
  },
});

export const selectFilters = (state) => state.option.filters;
export const selectActiveFilter = (state) => state.option.activeFilter;
export const selectSortItems = (state) => state.option.sortItems;
export const selectActiveSortItem = (state) => state.option.activeSortItem;

export const { setFilter, setSort } = optionSlice.actions;
export default optionSlice.reducer;

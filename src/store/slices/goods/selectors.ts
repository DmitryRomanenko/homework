import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { searchItems, sortItemsByAlphabet, sortItemsByWeight } from '../../../utils';

export const selectActiveSort = (state: RootState) => state.goods.activeSort;
export const selectSortItems = (state: RootState) => state.goods.sortItems;
export const selectSearchVal = (state: RootState) => state.goods.searchVal;
export const selectGoodsStatus = (state: RootState) => state.goods.status;

export const selectSortedGoods = createSelector(
  (state: RootState) => state.goods.items,
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

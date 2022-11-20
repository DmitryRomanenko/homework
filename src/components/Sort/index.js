import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { setSort, selectSortItems, selectActiveSortItem } from '../../store/slices/optionSlice';

const Sort = () => {
  const sortItems = useSelector(selectSortItems);
  const activeSortItem = useSelector(selectActiveSortItem);
  const dispatch = useDispatch();

  const onClickSetSort = (sortItem) => dispatch(setSort(sortItem));

  return (
    <>
      {sortItems.map((item) => {
        const id = nanoid();
        const isActive = activeSortItem.name === item.name;
        const activeClass = isActive ? 'todo__btn todo__btn-active' : 'todo__btn';
        return (
          <button type='button' key={id} className={activeClass} onClick={() => onClickSetSort(item)}>
            {item.name}
          </button>
        );
      })}
    </>
  );
};

export default Sort;

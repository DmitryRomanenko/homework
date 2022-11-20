import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { setSort, selectSortItems, selectActiveSortItem } from '../../store/slices/optionSlice';

const Sort = () => {
  const sortItems = useSelector(selectSortItems);
  const activeSortItem = useSelector(selectActiveSortItem);
  const dispatch = useDispatch();

  const onClickSetSort = (sortItem) => dispatch(setSort(sortItem));

  return (
    <>
      {sortItems.map((item, i) => {
        const isActive = activeSortItem.name === item.name;
        const activeClass = isActive ? 'todo__btn todo__btn-active' : 'todo__btn';
        return (
          <button key={i} className={activeClass} onClick={() => onClickSetSort(item)}>
            {item.name}
          </button>
        );
      })}
    </>
  );
};

export default Sort;

import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { setFilter, selectFilters, selectActiveFilter } from '../../store/slices/optionSlice';

const Filters = ({ todo }) => {
  const filters = useSelector(selectFilters);
  const activeFilter = useSelector(selectActiveFilter);
  const dispatch = useDispatch();

  const onCLickSetFilter = (filter) => dispatch(setFilter(filter));

  return (
    <>
      {filters.map((item, i) => {
        const isActive = item === activeFilter;
        const activeClass = isActive ? 'todo__btn todo__btn-active' : 'todo__btn';
        const setCount = isActive && todo.length > 0 ? <span>{todo.length}</span> : null;
        return (
          <button key={i} onClick={() => onCLickSetFilter(item)} className={activeClass}>
            {item}
            {setCount}
          </button>
        );
      })}
    </>
  );
};

export default Filters;

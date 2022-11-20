import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { setFilter, selectFilters, selectActiveFilter } from '../../store/slices/optionSlice';

const Filters = ({ todo }) => {
  const filters = useSelector(selectFilters);
  const activeFilter = useSelector(selectActiveFilter);
  const dispatch = useDispatch();

  const onCLickSetFilter = (filter) => dispatch(setFilter(filter));

  return (
    <>
      {filters.map((item) => {
        const id = nanoid();
        const isActive = item === activeFilter;
        const activeClass = isActive ? 'todo__btn todo__btn-active' : 'todo__btn';
        const setCount = isActive && todo.length > 0 ? <span>{todo.length}</span> : null;
        return (
          <button type='button' key={id} onClick={() => onCLickSetFilter(item)} className={activeClass}>
            {item}
            {setCount}
          </button>
        );
      })}
    </>
  );
};

Filters.propTypes = {
  todo: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      creationDate: PropTypes.number.isRequired,
      updateDate: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default Filters;

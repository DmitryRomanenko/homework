import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchVal, setSearchVal } from '../../store/slices/goodsSlice';

const Search = () => {
  const searchVal = useSelector(selectSearchVal);
  const searchInput = React.useRef(null);
  const dispatch = useDispatch();

  const setSearch = React.useCallback((e) => dispatch(setSearchVal(e.target.value)), [dispatch]);

  const onClickReset = React.useCallback(() => {
    dispatch(setSearchVal(''));
    searchInput.current.focus();
  }, [dispatch]);

  return (
    <div className='header__search'>
      <label className='header__search-icon' htmlFor='search'>
        <i className='fa-solid fa-magnifying-glass' />
      </label>
      <input
        ref={searchInput}
        onChange={setSearch}
        value={searchVal}
        id='search'
        placeholder='Type to search'
        type='text'
        className='header__search-input'
      />
      <span onClick={onClickReset} className='header__search-remove'>
        {searchVal ? <i className='fa-regular fa-circle-xmark' /> : null}
      </span>
    </div>
  );
};

export default Search;

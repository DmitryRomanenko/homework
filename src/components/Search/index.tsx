import React from 'react';
import { selectSearchVal } from '../../store/slices/goods/selectors';
import { setSearchVal } from '../../store/slices/goods/slice';
import { useAppDispatch, useAppSelector } from '../../hooks';

const Search = () => {
  const searchVal = useAppSelector(selectSearchVal);
  const searchInput = React.useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const setSearch = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setSearchVal(e.target.value)),
    [dispatch],
  );

  const onClickReset = React.useCallback(() => {
    dispatch(setSearchVal(''));
    searchInput.current?.focus();
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

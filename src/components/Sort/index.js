import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { selectActiveSort, selectSortItems, setActiveSort } from '../../store/slices/goodsSlice';

const Sort = () => {
  const [popUp, setPopUp] = React.useState(false);
  const activeSort = useSelector(selectActiveSort);
  const sortItmes = useSelector(selectSortItems);
  const dispatch = useDispatch();
  const sortItemRef = React.useRef(null);

  React.useEffect(() => {
    const onCLickClose = (e) => {
      if (!e.path.includes(sortItemRef.current)) {
        setPopUp(false);
      }
    };
    document.body.addEventListener('click', onCLickClose);
    return () => document.body.removeEventListener('click', onCLickClose);
  });

  const onClickSetPopUp = React.useCallback(() => setPopUp(!popUp), [popUp]);

  const onClickSetSort = React.useCallback(
    (item) => {
      dispatch(setActiveSort(item));
      setPopUp(false);
    },
    [dispatch],
  );

  return (
    <div ref={sortItemRef} className='header__sort'>
      <div className='header__sort-label'>
        <span>Sort by:</span>
        <span onClick={onClickSetPopUp}>{activeSort.name}</span>
      </div>
      <div className='header__sort-popup'>
        {popUp && (
          <ul>
            {sortItmes.map((item) => (
              <li
                key={nanoid()}
                onClick={() => onClickSetSort(item)}
                className={item.name === activeSort.name ? 'header__sort-active' : ''}>
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sort;

import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { ISortItem } from '../../store/slices/goods/types';
import { setActiveSort } from '../../store/slices/goods/slice';
import { selectActiveSort, selectSortItems } from '../../store/slices/goods/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';

const Sort = () => {
  const [popUp, setPopUp] = React.useState(false);
  const activeSort = useAppSelector(selectActiveSort);
  const sortItmes = useAppSelector(selectSortItems);
  const dispatch = useAppDispatch();
  const sortItemRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onCLickClose = (e: MouseEvent) => {
      const event = e as MouseEvent & { path: Node[] };
      if (sortItemRef.current && !event.path.includes(sortItemRef.current)) {
        setPopUp(false);
      }
    };
    document.body.addEventListener('click', onCLickClose);
    return () => document.body.removeEventListener('click', onCLickClose);
  });

  const onClickSetPopUp = React.useCallback(() => setPopUp(!popUp), [popUp]);

  const onClickSetSort = React.useCallback(
    (item: ISortItem) => {
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

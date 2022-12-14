import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { ResStatus } from '../store/slices/goods/types';

export const useStatus = () => {
  const [itemStatus, setItemStatus] = React.useState(ResStatus.CONFIRM);
  const isLoading = itemStatus === ResStatus.LOADING ? 'btn_loading' : '';
  const isError = itemStatus === ResStatus.ERROR;

  return { itemStatus, setItemStatus, isLoading, isError };
};

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

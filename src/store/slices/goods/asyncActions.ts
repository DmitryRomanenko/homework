import { createAsyncThunk } from '@reduxjs/toolkit';
import fetchData, { ServicesMethods } from '../../../services';
import { IAllGoodsRes, IProduct } from './types';

export const fetchAllGoods = createAsyncThunk<IAllGoodsRes>('goods/fetchAllGoods', () =>
  fetchData('goods', ServicesMethods.GET),
);

export const deleteProductById = createAsyncThunk<IProduct, string>('goods/deleteProductById', async (id) =>
  fetchData(`goods/${id}`, ServicesMethods.DELETE),
);

export const addProduct = createAsyncThunk<IProduct, Omit<IProduct, 'id' | 'category'>>(
  'goods/addProduct',
  async ({ title, description, weight }) => fetchData(`goods/`, ServicesMethods.POST, { title, description, weight }),
);

export const putProduct = createAsyncThunk<IProduct, Omit<IProduct, 'category'>>(
  'goods/putProduct',
  async ({ id, title, description, weight }) =>
    fetchData(`goods/${id}`, ServicesMethods.PUT, { title, description, weight }),
);

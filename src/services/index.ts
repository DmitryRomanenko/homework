import axios from 'axios';
import { IProduct } from '../store/slices/goods/types';

const baseUrl = 'http://localhost:8080';

export enum ServicesMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

const fetchData = async (url: string, method: ServicesMethods, data?: Omit<IProduct, 'id' | 'category'>) => {
  try {
    const res = await axios[method](`${baseUrl}/${url}`, data);
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw Error(e.response?.data);
    } else {
      throw Error('Error');
    }
  }
};

export default fetchData;

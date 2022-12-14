import { IProduct } from '../store/slices/goods/types';

export const sortItemsByAlphabet = (arr: IProduct[], operation: string, sortName: 'title' | 'weight') =>
  operation === 'desc'
    ? [...arr].sort((a, b) => b[sortName].localeCompare(a[sortName]))
    : [...arr].sort((a, b) => a[sortName].localeCompare(b[sortName]));

export const sortItemsByWeight = (arr: IProduct[], operation: string, sortName: 'title' | 'weight') =>
  operation === 'desc'
    ? [...arr].sort((a, b) => +b[sortName] - +a[sortName])
    : [...arr].sort((a, b) => +a[sortName] - +b[sortName]);

export const searchItems = (arr: IProduct[], title: string) =>
  arr.filter((item) => item.title.toLowerCase().includes(title.toLowerCase()));

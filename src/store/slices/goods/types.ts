export interface ISortItem {
  name: string;
  options: {
    sortBy: 'title' | 'weight';
    operation: 'asc' | 'desc';
  };
}

export enum ResStatus {
  LOADING = 'loading',
  ERROR = 'error',
  CONFIRM = 'confirm',
}

export interface IProduct {
  id: string;
  title: string;
  weight: string;
  description: string;
  category: string;
}

export interface IGoodsSliceState {
  activeSort: ISortItem;
  sortItems: ISortItem[];
  searchVal: string;
  items: IProduct[];
  status: ResStatus;
}

export interface IAllGoodsRes {
  goods: IProduct[];
}

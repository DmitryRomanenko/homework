import React from 'react';
import { deleteProductById } from '../../store/slices/goods/asyncActions';
import { useStatus, useAppDispatch } from '../../hooks';
import { IProduct, ResStatus } from '../../store/slices/goods/types';

interface IGoodsItemProps {
  data: IProduct;
  setEdit: React.Dispatch<React.SetStateAction<string>>;
}

const GoodsItem: React.FC<IGoodsItemProps> = ({ data: { title, weight, description, id }, setEdit }) => {
  const { itemStatus, setItemStatus, isLoading, isError } = useStatus();
  const dispatch = useAppDispatch();

  const onCLickEdit = React.useCallback(() => setEdit(id), [id, setEdit]);

  const onClickDelete = React.useCallback(() => {
    setItemStatus(ResStatus.LOADING);
    dispatch(deleteProductById(id))
      .unwrap()
      .catch(() => setItemStatus(ResStatus.ERROR));
  }, [dispatch, id, setItemStatus]);

  return (
    <div className='goods__block'>
      <div className='goods__title'>{title}</div>
      <div className='goods__text'>
        <p>
          <span>Description</span>: {description}
        </p>
        <p>
          <span>Weight</span>: {weight}
        </p>
      </div>
      <div className='goods__actions'>
        <button
          onClick={onCLickEdit}
          disabled={itemStatus === ResStatus.LOADING}
          className={`goods__btn ${isLoading}`}
          type='button'>
          Edit
        </button>
        <button
          onClick={onClickDelete}
          disabled={itemStatus === ResStatus.LOADING}
          className={`goods__btn goods__btn_red ${isLoading}`}
          type='button'>
          Delete
        </button>
        {isError ? <div className='error-message'>Something went wrong Try again later...</div> : null}
      </div>
    </div>
  );
};
export default GoodsItem;

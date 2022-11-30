import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProductById } from '../../store/slices/goodsSlice';
import { useStatus } from '../../hooks';

const GoodsItem = ({ data: { title, weight, description, id }, setEdit }) => {
  const { itemStatus, setItemStatus, isLoading, isError } = useStatus();
  const dispatch = useDispatch();

  const onCLickEdit = React.useCallback(() => setEdit(id), [id, setEdit]);

  const onClickDelete = React.useCallback(() => {
    setItemStatus('loading');
    dispatch(deleteProductById(id))
      .unwrap()
      .catch(() => setItemStatus('error'));
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
          disabled={itemStatus === 'loading'}
          className={`goods__btn ${isLoading}`}
          type='button'>
          Edit
        </button>
        <button
          onClick={onClickDelete}
          disabled={itemStatus === 'loading'}
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

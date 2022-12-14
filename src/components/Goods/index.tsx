import React from 'react';
import { selectSortedGoods, selectGoodsStatus } from '../../store/slices/goods/selectors';
import { fetchAllGoods, addProduct, putProduct } from '../../store/slices/goods/asyncActions';
import { ResStatus } from '../../store/slices/goods/types';
import GoodsForm from '../GoodsForm';
import GoodsItem from '../GoodsItem';
import Spinner from '../Spinner';
import { useAppSelector, useAppDispatch } from '../../hooks';

const Goods = () => {
  const [add, setAdd] = React.useState('');
  const [editId, setEdit] = React.useState('');
  const goods = useAppSelector(selectSortedGoods);
  const status = useAppSelector(selectGoodsStatus);
  const prefill = React.useMemo(() => goods.find((item) => item.id === editId), [editId, goods]);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchAllGoods());
  }, [dispatch]);

  const onCLickSetAdd = React.useCallback(() => {
    setAdd('open');
  }, []);
  const onCLickReload = React.useCallback(() => dispatch(fetchAllGoods()), [dispatch]);

  const postData = React.useCallback(
    (title: string, description: string, weight: string) =>
      dispatch(addProduct({ title, description, weight })).unwrap(),
    [dispatch],
  );
  const changeData = React.useCallback(
    (title: string, description: string, weight: string) =>
      dispatch(putProduct({ title, description, weight, id: editId })).unwrap(),
    [dispatch, editId],
  );

  const createContent = React.useCallback(() => {
    switch (status) {
      case ResStatus.LOADING:
        return <Spinner />;
      case ResStatus.CONFIRM:
        return goods.map((data) => {
          if (data.id === editId) {
            return (
              <GoodsForm
                text='Edit'
                key={data.id}
                closeItem={setEdit}
                item={editId}
                handleSubmit={changeData}
                prefill={prefill}
              />
            );
          }
          return <GoodsItem key={data.id} data={data} setEdit={setEdit} />;
        });
      case ResStatus.ERROR:
        return (
          <div className='fetchError'>
            <h2 className='fetchError-text'>Something went wrong</h2>
            <button className='fetchError-btn' type='button' onClick={onCLickReload}>
              Reload
            </button>
          </div>
        );
      default:
        throw new Error('error');
    }
  }, [changeData, editId, goods, onCLickReload, prefill, status]);

  return (
    <>
      <div className='container'>
        <div className='goods__wrapper'>{createContent()}</div>
      </div>
      {add === 'open' ? (
        <GoodsForm text='Add' item={add} closeItem={setAdd} handleSubmit={postData} />
      ) : (
        <button onClick={onCLickSetAdd} className='addButton' type='button'>
          <i className='fa-solid fa-square-plus' />
        </button>
      )}
    </>
  );
};

export default Goods;

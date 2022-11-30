import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllGoods,
  addProduct,
  putProduct,
  selectSortedGoods,
  selectGoodsStatus,
} from '../../store/slices/goodsSlice';
import GoodsForm from '../GoodsForm';
import GoodsItem from '../GoodsItem';
import Spinner from '../Spinner';

const Goods = () => {
  const [add, setAdd] = React.useState('');
  const [editId, setEdit] = React.useState('');
  const goods = useSelector(selectSortedGoods);
  const status = useSelector(selectGoodsStatus);
  const prefill = goods.find((item) => item.id === editId);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAllGoods());
  }, [dispatch]);

  const onCLickSetAdd = React.useCallback(() => {
    setAdd('open');
  }, []);
  const onCLickReload = React.useCallback(() => dispatch(fetchAllGoods()), [dispatch]);

  const postData = React.useCallback(
    (title, description, weight) => dispatch(addProduct({ title, description, weight })).unwrap(),
    [dispatch],
  );
  const changeData = React.useCallback(
    (title, description, weight) => dispatch(putProduct({ title, description, weight, id: editId })).unwrap(),
    [dispatch, editId],
  );

  const createContent = () => {
    switch (status) {
      case 'loading':
        return <Spinner />;
      case 'confirm':
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
      case 'error':
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
  };

  return (
    <>
      <div className='container'>
        <div className='goods__wrapper'>{createContent()}</div>
      </div>
      {add ? (
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

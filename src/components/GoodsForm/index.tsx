import React from 'react';
import { useStatus } from '../../hooks';
import { IProduct, ResStatus } from '../../store/slices/goods/types';

interface IGoodsFormProps {
  item: string;
  closeItem: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (title: string, description: string, weight: string) => Promise<IProduct>;
  prefill?: IProduct;
  text: 'Add' | 'Edit';
}

const GoodsForm: React.FC<IGoodsFormProps> = ({ item, closeItem, handleSubmit, prefill, text }) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const { itemStatus, setItemStatus, isLoading, isError } = useStatus();
  const setFormClass =
    text === 'Add' ? 'goods__block goods__block-form goods__block-form-add' : 'goods__block goods__block-form';

  React.useEffect(() => {
    if (prefill) {
      setTitle(prefill.title);
      setDescription(prefill.description);
      setWeight(prefill.weight);
    }
  }, [prefill]);

  const onChangeTitle = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value), []);
  const onChangeDescr = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value),
    [],
  );
  const onChangeWeight = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setWeight(e.target.value), []);

  const onCLickCLose = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      closeItem('');
      closeItem('');
      setTitle('');
      setDescription('');
      setWeight('');
    },
    [closeItem],
  );

  const onCLickAddProduct = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (title && description && weight) {
        if (title !== prefill?.title || description !== prefill?.description || weight !== prefill?.weight) {
          setItemStatus(ResStatus.LOADING);
          handleSubmit(title, description, weight)
            .then(() => {
              setItemStatus(ResStatus.CONFIRM);
              closeItem('');
              setTitle('');
              setDescription('');
              setWeight('');
            })
            .catch(() => setItemStatus(ResStatus.ERROR));
        }
      }
    },
    [
      closeItem,
      description,
      handleSubmit,
      prefill?.description,
      prefill?.title,
      prefill?.weight,
      title,
      weight,
      setItemStatus,
    ],
  );

  if (item) {
    return (
      <form className={setFormClass}>
        <div className='goods__title'>{text} Product</div>
        <div className='goods__block-input'>
          <input value={title} onChange={onChangeTitle} className='effect-3' type='text' placeholder='Title' />
          <span className='focus-border' />
        </div>
        <div className='goods__block-input'>
          <input
            value={description}
            onChange={onChangeDescr}
            className='effect-3'
            type='text'
            placeholder='Description'
          />
          <span className='focus-border' />
        </div>
        <div className='goods__block-input'>
          <input value={weight} onChange={onChangeWeight} className='effect-3' type='number' placeholder='Weight' />
          <span className='focus-border' />
        </div>
        <div className='goods__actions'>
          <button
            disabled={itemStatus === ResStatus.LOADING}
            onClick={onCLickAddProduct}
            type='submit'
            className={`goods__btn ${isLoading}`}>
            {text}
          </button>
          <button
            disabled={itemStatus === ResStatus.LOADING}
            onClick={onCLickCLose}
            className={`goods__btn goods__btn_red ${isLoading}`}
            type='submit'>
            Cancel
          </button>
        </div>
        {isError ? <div className='error-message'>Something went wrong Try again later...</div> : null}
      </form>
    );
  }
  return null;
};

export default GoodsForm;

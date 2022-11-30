import React from 'react';
import { useStatus } from '../../hooks';

const GoodsForm = ({ item, closeItem, handleSubmit, prefill, text }) => {
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

  const onChangeTitle = React.useCallback((e) => setTitle(e.target.value), []);
  const onChangeDescr = React.useCallback((e) => setDescription(e.target.value), []);
  const onChangeWeight = React.useCallback((e) => setWeight(e.target.value), []);

  const onCLickCLose = React.useCallback(
    (e) => {
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
    (e) => {
      e.preventDefault();
      if (title && description && weight) {
        if (title !== prefill?.title || description !== prefill?.description || weight !== prefill?.weight) {
          setItemStatus('loading');
          handleSubmit(title, description, weight)
            .then(() => {
              setItemStatus('confirm');
              closeItem('');
              setTitle('');
              setDescription('');
              setWeight('');
            })
            .catch(() => setItemStatus('error'));
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
            disabled={itemStatus === 'loading'}
            onClick={onCLickAddProduct}
            type='submit'
            className={`goods__btn ${isLoading}`}>
            {text}
          </button>
          <button
            disabled={itemStatus === 'loading'}
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

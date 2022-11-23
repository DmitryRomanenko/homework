import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useModal = (modalChange, close, id) => {
  const todos = useSelector((state) => state.todo.items);
  const prefill = todos.find((item) => item.id === id);
  const prefillTitle = prefill?.title ? prefill.title : '';
  const prefillDescr = prefill?.description ? prefill.description : '';
  const [title, setTitle] = React.useState(prefillTitle);
  const [description, setDescription] = React.useState(prefillDescr);
  const dispatch = useDispatch();

  const modalConfirm = React.useCallback(
    (e) => {
      e.preventDefault();
      if (title.length > 0 && description.length > 0 && (prefillTitle !== title || prefillDescr !== description)) {
        dispatch(modalChange({ id, title, description }));
        close();
        setDescription('');
        setTitle('');
      }
    },
    [title, dispatch, id, close, modalChange, description, prefillTitle, prefillDescr],
  );

  const modalClose = React.useCallback(
    (e) => {
      e.preventDefault();
      close();
      setDescription('');
      setTitle('');
    },
    [close],
  );

  return { title, setTitle, description, setDescription, modalClose, modalConfirm };
};

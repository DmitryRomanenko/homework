import React from 'react';
import { useDispatch } from 'react-redux';

export const useModal = (modalChange, close, id) => {
  const dispatch = useDispatch();
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const modalConfirm = React.useCallback(
    (e) => {
      e.preventDefault();
      if (title.length > 0 && description.length > 0) {
        dispatch(modalChange({ id, title, description }));
        close();
        setDescription('');
        setTitle('');
      }
    },
    [title, dispatch, id, close, modalChange, description],
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

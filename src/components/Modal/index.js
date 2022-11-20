import React from 'react';

import { useModal } from '../../hooks';

const Modal = ({ modalEdit, modalAdd, text, setAddModal, setEditModal, modalChange, id }) => {
  const setModal = setAddModal || setEditModal;
  const { title, setTitle, description, setDescription, modalConfirm, modalClose } = useModal(
    modalChange,
    setModal,
    id,
  );

  return (
    <div className={modalEdit || modalAdd ? 'modal modal__active' : 'modal'}>
      <div className="modal__wrapper">
        <div className="modal__logo">
          <i className="fa-regular fa-pen-to-square"></i>
          <div className="modal__logo-text">{text} Task</div>
        </div>
        <form>
          <label htmlFor="inputTitle">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            id="inputTitle"
            type="text"
          />
          <label htmlFor="description">Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            id="description"
            type="text"
          />
          <div className="modal__btns">
            <button type="submit" onClick={modalConfirm} className="modal__btn">
              {text}
            </button>
            <button type="submit" onClick={modalClose} className="modal__btn modal__btn_red">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;

import React from 'react';

import { useDispatch } from 'react-redux';

import { deleteTodo, setTodoComplete } from '../../store/slices/todoSlice';

import { transformDate } from '../../utils';

const TodoItem = ({ todo, setEditModal, setId }) => {
  const dispatch = useDispatch();

  const onClickDelete = (id) => dispatch(deleteTodo(id));

  const onClickComplete = (id) => dispatch(setTodoComplete(id));

  const onClickEdit = (status, id) => {
    if (status != 'Completed') {
      setEditModal(true);
      setId(id);
    }
  };

  return todo.length > 0 ? (
    todo.map(({ id, creationDate, updateDate, title, description, status }) => {
      const isCompleted = status == 'Completed';
      const activeClass = isCompleted ? 'todo__item todo__item-completed' : 'todo__item';
      return (
        <div key={id} className={activeClass}>
          <label className="todo__checkbox">
            <input onChange={() => onClickComplete(id)} type="checkbox" checked={isCompleted} />
            <span className="checkmark"></span>
          </label>
          <div onClick={() => onClickEdit(status, id)} className="todo__edit">
            <i className="fa-solid fa-pen"></i>
          </div>
          <div onClick={() => onClickDelete(id)} className="todo__delete">
            <i className="fa-solid fa-trash"></i>
          </div>
          <div className="todo__item-text">
            <div className="todo__item-title">{title}</div>
            <div className="todo__item-descr">
              <span>Description: </span> {description}
            </div>
          </div>
          <div className="todo__item-info">
            <div className="todo__date">
              <span>Creation date:</span> {transformDate(creationDate)}
            </div>
            <div className="todo__date">
              <span>Update date:</span> {transformDate(updateDate)}
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <div className="todo__empty">
      <i className="fa-regular fa-pen-to-square"></i>
      <h2 className="todo__empty-title">Nothing here yet</h2>
    </div>
  );
};
export default TodoItem;

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { transformDate } from '../../utils';
import { deleteTodo, setTodoComplete } from '../../store/slices/todoSlice';

const TodoItem = ({ todo, setEditModal, setId }) => {
  const dispatch = useDispatch();

  const onClickDelete = (id) => dispatch(deleteTodo(id));

  const onClickComplete = (id) => dispatch(setTodoComplete(id));

  const onClickEdit = (status, id) => {
    if (status !== 'Completed') {
      setEditModal(true);
      setId(id);
    }
  };

  return todo.length > 0 ? (
    todo.map(({ id, creationDate, updateDate, title, description, status }) => {
      const isCompleted = status === 'Completed';
      const activeClass = isCompleted ? 'todo__item todo__item-completed' : 'todo__item';
      return (
        <div key={id} className={activeClass}>
          <label className='todo__checkbox'>
            <input onChange={() => onClickComplete(id)} type='checkbox' checked={isCompleted} />
            <span className='checkmark' />
          </label>
          <button type='button' onClick={() => onClickEdit(status, id)} className='todo__edit'>
            <i className='fa-solid fa-pen' />
          </button>
          <button type='button' onClick={() => onClickDelete(id)} className='todo__delete'>
            <i className='fa-solid fa-trash' />
          </button>
          <div className='todo__item-text'>
            <div className='todo__item-title'>{title}</div>
            <div className='todo__item-descr'>
              <span>Description: </span> {description}
            </div>
          </div>
          <div className='todo__item-info'>
            <div className='todo__date'>
              <span>Creation date:</span> {transformDate(creationDate)}
            </div>
            <div className='todo__date'>
              <span>Update date:</span> {transformDate(updateDate)}
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <div className='todo__empty'>
      <i className='fa-regular fa-pen-to-square' />
      <h2 className='todo__empty-title'>Nothing here yet</h2>
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      creationDate: PropTypes.number.isRequired,
      updateDate: PropTypes.number.isRequired,
    }),
  ).isRequired,
  setEditModal: PropTypes.func.isRequired,
  setId: PropTypes.func.isRequired,
};

export default TodoItem;

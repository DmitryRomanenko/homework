import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredTodo, editTodo, addTodo } from '../store/slices/todoSlice';
import TodoItem from '../components/TodoItem';
import Filters from '../components/Filters';
import Sort from '../components/Sort';
import Modal from '../components/Modal';
import Header from '../components/Header';
import ButtonToTop from '../components/ButtonToTop';

const MainPage = () => {
  const todo = useSelector(selectFilteredTodo);
  const [modalAdd, setAddModal] = React.useState(false);
  const [modalEdit, setEditModal] = React.useState(false);
  const [id, setId] = React.useState('');

  const openModal = () => {
    if (modalAdd) {
      return <Modal modalAdd={modalAdd} text='Add' setAddModal={setAddModal} modalChange={addTodo} />;
    }
    if (modalEdit) {
      return <Modal id={id} modalEdit={modalEdit} text='Edit' setEditModal={setEditModal} modalChange={editTodo} />;
    }
    return null;
  };

  return (
    <>
      <section className='todo'>
        <div className='container'>
          <Header />
          <div className='todo__wrapper'>
            <div className='todo__head'>
              <div className='todo__options'>
                <div className='todo__head-text'>Filter by:</div>
                <Filters todo={todo} />
              </div>
              <div className='todo__options'>
                <div className='todo__head-text'>Sort by:</div>
                <Sort />
              </div>
            </div>
            <div className='todo__body'>
              <TodoItem todo={todo} setEditModal={setEditModal} setId={setId} />
            </div>
          </div>
          <button type='button' onClick={() => setAddModal(true)} className='todo__add-btn'>
            <i className='fa-solid fa-circle-plus' />
          </button>
        </div>
      </section>
      <ButtonToTop />
      {openModal()}
    </>
  );
};

export default MainPage;

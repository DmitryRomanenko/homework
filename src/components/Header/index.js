import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { userLogOut } from '../../store/slices/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <header className="todo__header">
      <div className="todo__header-title">Todo list</div>
      <button
        className="todo__logout-btn"
        onClick={() => {
          dispatch(userLogOut());
          navigate('/login', { replace: true });
        }}>
        Log out
      </button>
    </header>
  );
};

export default Header;

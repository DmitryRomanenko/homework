import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogIn } from '../store/slices/userSlice';

const LoginPage = () => {
  const [userName, setUserName] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      if (userName !== '' && userPassword !== '') {
        dispatch(userLogIn({ userName, userPassword }));
        navigate('/', { replace: true });
      }
    },
    [dispatch, navigate, userName, userPassword],
  );

  const onClickSetName = React.useCallback((e) => setUserName(e.target.value), []);
  const onClickSetPassword = React.useCallback((e) => setUserPassword(e.target.value), []);

  return (
    <div className='login'>
      <div className='login__block'>
        <i className='fa-solid fa-user login__icon' />
        <h1 className='login__title'>Log In</h1>
      </div>
      <form className='login__form' onSubmit={handleSubmit}>
        <input placeholder='Username' onChange={onClickSetName} type='text' value={userName} />
        <input placeholder='Password' onChange={onClickSetPassword} type='password' value={userPassword} />
        <button type='submit' className='login__btn'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

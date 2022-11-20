import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUserName, selectUserPassword } from '../../store/slices/userSlice';

const UserAuth = ({ children }) => {
  const userName = useSelector(selectUserName);
  const userPassword = useSelector(selectUserPassword);
  if (userName && userPassword) {
    return children;
  }
  return <Navigate to='/login' />;
};

UserAuth.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserAuth;

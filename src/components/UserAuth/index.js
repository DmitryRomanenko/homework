import React from 'react';

import { useSelector } from 'react-redux';

import { Navigate } from 'react-router-dom';

import { selectUserName, selectUserPassword } from '../../store/slices/userSlice';

const UserAuth = ({ children }) => {
  const userName = useSelector(selectUserName);
  const userPassword = useSelector(selectUserPassword);
  if (userName && userPassword) {
    return children;
  }
  return <Navigate to="/login" />;
};

export default UserAuth;

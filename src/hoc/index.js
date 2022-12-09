import React from 'react';
import { useStatus } from '../hooks';

export const withStatus = (Component) => (props) => {
  const { itemStatus, setItemStatus, isLoading, isError } = useStatus();
  return (
    <Component
      itemStatus={itemStatus}
      setItemStatus={setItemStatus}
      isLoading={isLoading}
      isError={isError}
      {...props}
    />
  );
};

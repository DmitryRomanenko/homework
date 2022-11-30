import React from 'react';

export const useStatus = () => {
  const [itemStatus, setItemStatus] = React.useState('confirm');
  const isLoading = itemStatus === 'loading' ? 'btn_loading' : '';
  const isError = itemStatus === 'error';

  return { itemStatus, setItemStatus, isLoading, isError };
};

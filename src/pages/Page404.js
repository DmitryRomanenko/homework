import React from 'react';

import { useNavigate } from 'react-router-dom';

const Page404 = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const timeoutID = setTimeout(() => {
      return navigate('/', { replace: true });
    }, 1000);
    return () => clearTimeout(timeoutID);
  }, []);

  return (
    <div className="page404">
      <i className="fa-solid fa-circle-exclamation page404__ico"></i>
      <h1 className="page404__title">Oooops!</h1>
      <h2 className="page404__subtitle">Error 404</h2>
      <h2 className="page404__text">page not found :(</h2>
    </div>
  );
};

export default Page404;

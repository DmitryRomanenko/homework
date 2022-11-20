import React from 'react';

const ButtonToTop = () => {
  const [toTop, setToTop] = React.useState(false);
  React.useEffect(() => {
    const showBtn = () => {
      window.scrollY > 200 ? setToTop(true) : setToTop(false);
    };
    window.addEventListener('scroll', showBtn);
    return () => window.removeEventListener('scroll', showBtn);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return toTop ? (
    <div className="toTop" onClick={scrollToTop}>
      <i className="fa-solid fa-circle-arrow-up"></i>
    </div>
  ) : null;
};

export default ButtonToTop;

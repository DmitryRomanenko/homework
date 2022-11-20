import React from 'react';

const ButtonToTop = () => {
  const [toTop, setToTop] = React.useState(false);
  React.useEffect(() => {
    const showBtn = () => {
      if (window.scrollY > 200) {
        setToTop(true);
      } else {
        setToTop(false);
      }
    };
    window.addEventListener('scroll', showBtn);
    return () => window.removeEventListener('scroll', showBtn);
  }, []);
  const scrollToTop = React.useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return toTop ? (
    <button type='button' className='toTop' onClick={scrollToTop}>
      <i className='fa-solid fa-circle-arrow-up' />
    </button>
  ) : null;
};

export default ButtonToTop;

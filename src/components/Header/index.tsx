import React from 'react';
import Search from '../Search';
import Sort from '../Sort';

const Header = () => (
  <header className='header'>
    <div className='header__wrapper'>
      <Search />
      <Sort />
    </div>
  </header>
);

export default Header;

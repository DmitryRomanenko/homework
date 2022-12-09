import React from 'react';
import Search from '../Search';
import Sort from '../Sort';

class Header extends React.Component {
  render() {
    return (
      <header className='header'>
        <div className='header__wrapper'>
          <Search />
          <Sort />
        </div>
      </header>
    );
  }
}

export default Header;

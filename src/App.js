import React from 'react';
import Header from './components/Header';
import Goods from './components/Goods';

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Goods />
      </>
    );
  }
}

export default App;

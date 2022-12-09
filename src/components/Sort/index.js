import React from 'react';
import { connect } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { selectActiveSort, selectSortItems, setActiveSort } from '../../store/slices/goodsSlice';

class Sort extends React.Component {
  constructor(props) {
    super(props);
    this.sortItemRef = React.createRef(null);
    this.state = { popUp: false };
  }

  componentDidMount() {
    document.body.addEventListener('click', this.onCLickClose);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.onCLickClose);
  }

  onCLickClose = (e) => {
    if (!e.path.includes(this.sortItemRef.current)) {
      this.setState({ popUp: false });
    }
  };

  onClickSetPopUp = () => this.setState((state) => ({ popUp: !state.popUp }));

  onClickSetSort = (item) => {
    this.props.setActiveSort(item);
    this.setState({ popUp: false });
  };

  render() {
    return (
      <div ref={this.sortItemRef} className='header__sort'>
        <div className='header__sort-label'>
          <span>Sort by:</span>
          <span onClick={this.onClickSetPopUp}>{this.props.activeSort.name}</span>
        </div>
        <div className='header__sort-popup'>
          {this.state.popUp && (
            <ul>
              {this.props.sortItmes.map((item) => (
                <li
                  key={nanoid()}
                  onClick={() => this.onClickSetSort(item)}
                  className={item.name === this.props.activeSort.name ? 'header__sort-active' : ''}>
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  activeSort: selectActiveSort(state),
  sortItmes: selectSortItems(state),
});

const mapDispatchToProps = (dispatch) => ({
  setActiveSort: (item) => dispatch(setActiveSort(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sort);

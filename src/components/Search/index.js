import React from 'react';
import { connect } from 'react-redux';
import { selectSearchVal, setSearchVal } from '../../store/slices/goodsSlice';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.searchInput = React.createRef(null);
  }

  setSearch = (e) => this.props.setSearchVal(e.target.value);

  onClickReset = () => {
    this.props.setSearchVal('');
    this.searchInput.current.focus();
  };

  render() {
    return (
      <div className='header__search'>
        <label className='header__search-icon' htmlFor='search'>
          <i className='fa-solid fa-magnifying-glass' />
        </label>
        <input
          ref={this.searchInput}
          onChange={this.setSearch}
          value={this.props.searchVal}
          id='search'
          placeholder='Type to search'
          type='text'
          className='header__search-input'
        />
        <span onClick={this.onClickReset} className='header__search-remove'>
          {this.props.searchVal ? <i className='fa-regular fa-circle-xmark' /> : null}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchVal: selectSearchVal(state),
});

const mapDispatchToProps = (dispatch) => ({
  setSearchVal: (searchVal) => dispatch(setSearchVal(searchVal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);

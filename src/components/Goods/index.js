import React from 'react';
import { connect } from 'react-redux';
import {
  fetchAllGoods,
  addProduct,
  putProduct,
  selectSortedGoods,
  selectGoodsStatus,
} from '../../store/slices/goodsSlice';
import GoodsForm from '../GoodsForm';
import GoodsItem from '../GoodsItem';
import Spinner from '../Spinner';

class Goods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      add: '',
      editId: '',
      prefill: '',
    };
  }

  componentDidMount() {
    this.props.fetchAllGoods();
  }

  onCLickSetAdd = () => {
    this.setState({ add: 'open' });
  };

  onCLickReload = () => this.props.fetchAllGoods();

  setEdit = (arg) => {
    this.setState({ editId: arg, prefill: this.props.goods.find((item) => item.id === arg) });
  };

  setAdd = (arg) => {
    this.setState({ add: arg });
  };

  postData = (title, description, weight) => this.props.addProduct({ title, description, weight }).unwrap();

  changeData = (title, description, weight) =>
    this.props.putProduct({ title, description, weight, id: this.state.editId }).unwrap();

  createContent = () => {
    switch (this.props.status) {
      case 'loading':
        return <Spinner />;
      case 'confirm':
        return this.props.goods.map((data) => {
          if (data.id === this.state.editId) {
            return (
              <GoodsForm
                text='Edit'
                key={data.id}
                closeItem={this.setEdit}
                item={this.state.editId}
                handleSubmit={this.changeData}
                prefill={this.state.prefill}
              />
            );
          }
          return <GoodsItem key={data.id} data={data} setEdit={this.setEdit} />;
        });
      case 'error':
        return (
          <div className='fetchError'>
            <h2 className='fetchError-text'>Something went wrong</h2>
            <button className='fetchError-btn' type='button' onClick={this.onCLickReload}>
              Reload
            </button>
          </div>
        );
      default:
        throw new Error('error');
    }
  };

  render() {
    return (
      <>
        <div className='container'>
          <div className='goods__wrapper'>{this.createContent()}</div>
        </div>
        {this.state.add ? (
          <GoodsForm text='Add' item={this.state.add} closeItem={this.setAdd} handleSubmit={this.postData} />
        ) : (
          <button onClick={this.onCLickSetAdd} className='addButton' type='button'>
            <i className='fa-solid fa-square-plus' />
          </button>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  goods: selectSortedGoods(state),
  status: selectGoodsStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllGoods: () => dispatch(fetchAllGoods()),
  addProduct: ({ title, description, weight }) => dispatch(addProduct({ title, description, weight })),
  putProduct: ({ title, description, weight, id: editId }) =>
    dispatch(putProduct({ title, description, weight, id: editId })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Goods);

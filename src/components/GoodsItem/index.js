import React from 'react';
import { connect } from 'react-redux';
import { deleteProductById } from '../../store/slices/goodsSlice';
import { withStatus } from '../../hoc';

class GoodsItem extends React.Component {
  onCLickEdit = () => this.props.setEdit(this.props.data.id);

  onClickDelete = () => {
    this.props.setItemStatus('loading');
    this.props
      .deleteProduct(this.props.data.id)
      .unwrap()
      .catch(() => this.props.setItemStatus('error'));
  };

  render() {
    return (
      <div className='goods__block'>
        <div className='goods__title'>{this.props.data.title}</div>
        <div className='goods__text'>
          <p>
            <span>Description</span>: {this.props.data.description}
          </p>
          <p>
            <span>Weight</span>: {this.props.data.weight}
          </p>
        </div>
        <div className='goods__actions'>
          <button
            onClick={this.onCLickEdit}
            disabled={this.props.itemStatus === 'loading'}
            className={`goods__btn ${this.props.isLoading}`}
            type='button'>
            Edit
          </button>
          <button
            onClick={this.onClickDelete}
            disabled={this.props.itemStatus === 'loading'}
            className={`goods__btn goods__btn_red ${this.props.isLoading}`}
            type='button'>
            Delete
          </button>
          {this.props.isError ? <div className='error-message'>Something went wrong Try again later...</div> : null}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteProduct: (id) => dispatch(deleteProductById(id)),
});

export default connect(null, mapDispatchToProps)(withStatus(GoodsItem));

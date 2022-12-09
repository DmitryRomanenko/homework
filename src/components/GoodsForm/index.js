import React from 'react';
import { connect } from 'react-redux';
import { withStatus } from '../../hoc';

class GoodsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      weight: '',
    };
    this.setFormClass =
      this.props.text === 'Add'
        ? 'goods__block goods__block-form goods__block-form-add'
        : 'goods__block goods__block-form';
  }

  componentDidMount() {
    if (this.props.prefill) {
      this.setState({
        title: this.props.prefill.title,
        description: this.props.prefill.description,
        weight: this.props.prefill.weight,
      });
    }
  }

  onChangeTitle = (e) => this.setState({ title: e.target.value });

  onChangeDescr = (e) => this.setState({ description: e.target.value });

  onChangeWeight = (e) => this.setState({ weight: e.target.value });

  clearInputs = () => {
    this.setState({
      title: '',
      description: '',
      weight: '',
    });
  };

  onCLickCLose = (e) => {
    e.preventDefault();
    this.props.closeItem('');
    this.clearInputs();
  };

  onCLickAddProduct = (e) => {
    e.preventDefault();
    if (this.state.title && this.state.description && this.state.weight) {
      if (
        this.state.title !== this.props.prefill?.title ||
        this.state.description !== this.props.prefill?.description ||
        this.state.weight !== this.props.prefill?.weight
      ) {
        this.props.setItemStatus('loading');
        this.props
          .handleSubmit(this.state.title, this.state.description, this.state.weight)
          .then(() => {
            this.props.setItemStatus('confirm');
            this.props.closeItem('');
            this.clearInputs();
          })
          .catch(() => this.props.setItemStatus('error'));
      }
    }
  };

  render() {
    if (this.props.item) {
      return (
        <form className={this.setFormClass}>
          <div className='goods__title'>{this.props.text} Product</div>
          <div className='goods__block-input'>
            <input
              value={this.state.title}
              onChange={this.onChangeTitle}
              className='effect-3'
              type='text'
              placeholder='Title'
            />
            <span className='focus-border' />
          </div>
          <div className='goods__block-input'>
            <input
              value={this.state.description}
              onChange={this.onChangeDescr}
              className='effect-3'
              type='text'
              placeholder='Description'
            />
            <span className='focus-border' />
          </div>
          <div className='goods__block-input'>
            <input
              value={this.state.weight}
              onChange={this.onChangeWeight}
              className='effect-3'
              type='number'
              placeholder='Weight'
            />
            <span className='focus-border' />
          </div>
          <div className='goods__actions'>
            <button
              disabled={this.props.itemStatus === 'loading'}
              onClick={this.onCLickAddProduct}
              type='submit'
              className={`goods__btn ${this.props.isLoading}`}>
              {this.props.text}
            </button>
            <button
              disabled={this.props.itemStatus === 'loading'}
              onClick={this.onCLickCLose}
              className={`goods__btn goods__btn_red ${this.props.isLoading}`}
              type='submit'>
              Cancel
            </button>
          </div>
          {this.props.isError ? <div className='error-message'>Something went wrong Try again later...</div> : null}
        </form>
      );
    }
    return null;
  }
}

export default connect()(withStatus(GoodsForm));


import React, { PropTypes } from 'react';
import ModalSelectList from './ModalSelectList';
import ListView from './ListView';

class List extends React.Component {
  static propTypes = {
    isModal: PropTypes.bool,
    // modalCallback: PropTypes.func,
  }

  static defaultProps = {
    modalSelect: false,
  }

  render() {
    if (this.props.isModal) {
      return (<ModalSelectList {...this.props} />);
    }

    return (<ListView {...this.props} />);
  }
}

export default List;

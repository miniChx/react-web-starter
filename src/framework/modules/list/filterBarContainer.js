/**
 * Created by baoyinghai on 1/4/17.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'mxa';

export default class FilterBarContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      height: null
    };
  }

  /* eslint-disable */
  _setHeight = () => {
    if (!this.state.height || this.state.height === '0px') {
      const lastHeight = ReactDOM.findDOMNode(this) ? ReactDOM.findDOMNode(this).offsetHeight + 'px' : '';
      setTimeout(() => {
        if (lastHeight !== this.state.height) {
          this.setState({
            height: lastHeight
          });
        }
      });

    }
  };

  componentDidUpdate() {
    this._setHeight();
  }

  render() {
    const { prefixCls } = this.props;
    const defaultSearchBar = `${prefixCls}-search-bar-default`;
    return (
      <div className={defaultSearchBar} style={{ height: this.props.advancedSearch ? this.state.height : '0px' }}>
        <Row>
          <Col offset="21" style={{borderLeft: '2px solid #EBEBEB' }}>
            <div style={{borderBottom: '4px solid #fff', display: 'flex', flex: '1'}}/>
          </Col>
        </Row>
        {this.props.children}
      </div>
    );
  }
}

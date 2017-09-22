/**
 * Created by vison on 17/1/3.
 */
import React, { PropTypes } from 'react';
import { Row, Col, Button } from 'antd';
import SearchInput from './SearchInput';

export default class SuperSearch extends React.Component {
  static PropTypes = {
    dataSource: PropTypes.array,
    prefixCls: PropTypes.string,
    onSearch: PropTypes.func
  };

  static defaultProps = {
    dataSource: [],
    prefixCls: 'mx-super-search-self'
  };

  constructor(props) {
    super(props);
    this.state = {
      requestFilterFields: []
    };
  }

  _renderSearchButton = () => {
    return (
      <div>
        <Button
          type="primary"
          size="large"
          icon="search"
          onClick={this._onSearch}
        >检索</Button>
      </div>
    );
  }

  _onSearch = () => {
    this.props.onSearch && this.props.onSearch(this.state.requestFilterFields);
  }

  _onChange = value => {
    const { requestFilterFields } = this.state;
    const updated = requestFilterFields.some((element, index, array) => {
      if (value.fieldName === element.fieldName) {
        array[index] = value;
        return true;
      }
      return false;
    });

    if (!updated) {
      requestFilterFields.push(value);
    }
    this.setState({ requestFilterFields });
  }

  render() {
    const dataSource = this.props.dataSource;
    const prefixCls = this.props.prefixCls;
    const advancedData = this.props.dataSource;
    // if (dataSource && dataSource.length > 1) {
    //   advancedData = dataSource.slice(1);
    // }
    let offsetNum = 8;
    if (advancedData.length % 3 === 0) {
      offsetNum = 16;
    } else if (advancedData.length % 3 === 1) {
      offsetNum = 8;
    } else {
      offsetNum = 0;
    }
    return (
      <div className={`${prefixCls}`}>
        <Row gutter={256}>
          {
            advancedData && advancedData.map(item => (
              <Col span={8} className={`${prefixCls}-col`}>
                <SearchInput
                  key={item.fieldName}
                  type={item.type}
                  operatorType={item.operatorType}
                  code={item.fieldName}
                  title={item.displayName}
                  extra={item.extra}
                  onChange={this._onChange}
                />
              </Col>
            ))
          }
          <Col span={8} offset={offsetNum}>
            {this._renderSearchButton()}
          </Col>
        </Row>
      </div>
    );
  }
}

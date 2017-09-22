/**
 * Created by vison on 17/1/3.
 */
import React, { PropTypes } from 'react';
import { Button } from 'antd';
import SearchInput from './SearchInput';

export default class SearchPlus extends React.Component {
  static PropTypes = {
    prefixCls: PropTypes.string,
    dataSource: PropTypes.object,
    onSearch: PropTypes.func,
    onAdvanceSearch: PropTypes.func
  };

  static defaultProps = {
    dataSource: [],
    prefixCls: 'mx-search-self',
    onAdvanceSearch: null
  };

  constructor(props) {
    super(props);
    this.state = {
      advancedSearch: false
    };
  }

  _onChange = value => {
    // const { requestFilterFields } = this.state;
    // const updated = requestFilterFields.some((element, index, array) => {
    //   if (value.fieldName === element.fieldName) {
    //     array[index] = value;
    //     return true;
    //   }
    //   return false;
    // });
    //
    // if (!updated) {
    //   requestFilterFields.push(value);
    // }
    // this.setState({ requestFilterFields });
  }

  _onDefaultSearch = value => {
    this.props.onSearch && this.props.onSearch(value);
  }

  _switchModel = () => {
    this.setState({
      advancedSearch: !this.state.advancedSearch,
    });
    this.props.onAdvanceSearch && this.props.onAdvanceSearch();
  }

  render() {
    const dataSource = this.props.dataSource;
    const prefixCls = this.props.prefixCls;
    if (dataSource) {
      return (
        <div className={`${prefixCls}-basic`}>
          <SearchInput
            prefixCls={`${prefixCls}-input`}
            type={dataSource.type}
            operatorType={dataSource.operatorType}
            code={dataSource.fieldName}
            title={dataSource.displayName}
            extra={dataSource.extra}
            hideButton={false}
            onChange={this._onChange}
            onSearch={this._onDefaultSearch}
          />
          {this.props.onAdvanceSearch ? <Button
            type="primary"
            icon={this.state.advancedSearch ? 'up-circle-o' : 'down-circle-o'}
            className={`${prefixCls}-basic-switch`}
            onClick={this._switchModel}
          >高级搜索</Button>
            : null}
        </div>
      );
    }
    return null;
  }
}

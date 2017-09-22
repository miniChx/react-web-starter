/**
 * Created by vison on 12/27/16.
 */
import React, { PropTypes } from 'react';
import { Button } from 'antd';
import SearchInput from './SearchInput';


export default class Search extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    dataSource: PropTypes.array,
    onSearch: PropTypes.func,
  };

  static defaultProps = {
    dataSource: [],
    prefixCls: 'mx-search',
  };

  constructor(props) {
    super(props);
    // initial state
    this.state = {
      advancedSearch: false,
      requestFilterFields: [],
    };
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

  _onSearch = () => {
    this.props.onSearch && this.props.onSearch(this.state.requestFilterFields);
  }

  _onDefaultSearch = value => {
    this.props.onSearch && this.props.onSearch(value);
  }


  render() {
    const { prefixCls, dataSource } = this.props;
    if (dataSource && dataSource.length > 0) {
      const defaultSearch = dataSource[0];
      return (
        <div className={`${prefixCls}`}>
          <div className={`${prefixCls}-basic`}>
            <SearchInput
              isSummary={this.props.isSummary}
              prefixCls={`${prefixCls}-input`}
              type={defaultSearch.type}
              operatorType={defaultSearch.operatorType}
              code={defaultSearch.fieldName}
              title={defaultSearch.displayName}
              extra={defaultSearch.extra}
              hideButton={this.state.advancedSearch}
              onChange={this._onChange}
              onSearch={this._onDefaultSearch}
            />
          </div>
        </div>
      );
    }
    return null;
  }
}

/**
 * Created by vison on 1/4/17.
 */
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
    const dataSource = this.props.dataSource;
    const title = [];
    const filterItems = [];
    dataSource.forEach(item => {
      title.push(item.displayName);
      filterItems.push(item);
    });
    this.state = {
      requestFilterFields: [],
      title,
      filterItems
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
    if (this.props.dataSource && this.props.dataSource.length > 0 && this.state.title.length > 0) {
      const { prefixCls } = this.props;
      return (
        <div className={`${prefixCls}`}>
          <div className={`${prefixCls}-basic`}>
            <SearchInput
              isSummary={this.props.isSummary}
              prefixCls={`${prefixCls}-input`}
              operatorType={'LIKE'}
              code={'summary_search'}
              title={this.state.title.join('/')}
              hideButton={false}
              onChange={this._onChange}
              onSearch={this._onDefaultSearch}
              placeholder={this.state.title.join('/')}
              disabled={this.props.advancedSearch}
            />
          </div>
        </div>
      );
    }
    return null;
  }
}

/**
 * Created by baoyinghai on 12/27/16.
 */
import React, { PropTypes } from 'react';
import { Button } from 'mxa';
import SearchInput from './SearchInput';


export default class Search extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    dataSource: PropTypes.array,
    onSearch: PropTypes.func,
  };

  static defaultProps = {
    dataSource: [],
    prefixCls: 'mx-search-self',
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

  _renderAdvancedSearch = () => {
    if (this.state.advancedSearch) {
      const { prefixCls, dataSource } = this.props;
      if (dataSource && dataSource.length > 1) {
        const advancedData = dataSource.slice(1);
        return (
          <div className={`${prefixCls}-advanced`}>
            {
              advancedData.map(item => (
                <SearchInput
                  key={item.fieldName}
                  type={item.type}
                  operatorType={item.operatorType}
                  code={item.fieldName}
                  title={item.displayName}
                  extra={item.extra}
                  onChange={this._onChange}
                />
              ))
            }
            <Button
              className={`${prefixCls}-advanced-button`}
              type="primary"
              size="large"
              icon="search"
              onClick={this._onSearch}
            >搜索</Button>
          </div>
        );
      }
    }
    return (<div />);
  }

  _switchModel = () => {
    this.setState({
      advancedSearch: !this.state.advancedSearch,
    }, () => {
      if (!this.state.advancedSearch) {
        const { dataSource } = this.props;
        if (dataSource && dataSource.length > 0) {
          const defaultSearch = dataSource[0];
          const requestFilterFields = this.state.requestFilterFields.filter(item => item.fieldName === defaultSearch.fieldName);
          this.setState({
            requestFilterFields,
          });
        }
      }
    });
  }

  render() {
    const { prefixCls, dataSource } = this.props;
    if (dataSource && dataSource.length > 0) {
      const defaultSearch = dataSource[0];
      return (
        <div className={`${prefixCls}`}>
          <div className={`${prefixCls}-basic`}>
            <SearchInput
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
            {dataSource.length > 1 ? <Button
              type="primary"
              icon={this.state.advancedSearch ? 'up-circle-o' : 'down-circle-o'}
              className={`${prefixCls}-basic-switch`}
              onClick={this._switchModel}
            >高级搜索</Button>
              : null}
          </div>
          {this._renderAdvancedSearch()}
        </div>
      );
    }
    return null;
  }
}

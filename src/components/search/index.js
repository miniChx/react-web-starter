/* eslint-disable no-console */

import React, { PropTypes } from 'react';
import { autobind } from 'core-decorators';
import { Button } from 'mxa';
import SearchInput from './SearchInput';

class Search extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    onSearch: PropTypes.func,
  };

  constructor(props) {
    super(props);
    // initial state
    this.state = {
      advancedSearch: false,
      requestFilterFields: [],
    };
  }

  @autobind
  _onChange(value) {
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

  @autobind
  _onSearch() {
    this.props.onSearch && this.props.onSearch(this.state.requestFilterFields);
  }

  @autobind
  _renderAdvancedSearch() {
    if (this.state.advancedSearch) {
      const advancedData = this.props.data.slice(1);
      return (
        <div className="search-advanced">
          {
            advancedData.map(item => (
              <SearchInput
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
            className="search-advanced-button"
            type="primary"
            size="large"
            icon="search"
            onClick={this._onSearch}
          >搜索</Button>
        </div>
      );
    }
    return (<div />);
  }

  render() {
    const { data } = this.props;
    if (data && data.length > 0) {
      const defaultSearch = data[0];
      return (
        <div className="search">
          <div className="search-basic">
            <SearchInput
              type={defaultSearch.type}
              operatorType={defaultSearch.operatorType}
              code={defaultSearch.fieldName}
              title={defaultSearch.displayName}
              extra={defaultSearch.extra}
              hideButton={this.state.advancedSearch}
              onChange={this._onChange}
              onSearch={this._onSearch}
            />
            <Button
              type="primary"
              icon={this.state.advancedSearch ? 'up-circle-o' : 'down-circle-o'}
              className="search-basic-switch"
              onClick={() => this.setState({ advancedSearch: !this.state.advancedSearch })}
            >高级搜索</Button>
          </div>
          {this._renderAdvancedSearch()}
        </div>
      );
    }
    return null;
  }
}

export default Search;

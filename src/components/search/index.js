/* eslint-disable no-console */

import React from 'react';
import { autobind } from 'core-decorators';
import { Button } from 'mxa';
import SearchInput from './SearchInput';

class Search extends React.Component {
  constructor(props) {
    super(props);
    // initial state
    this.state = {
      advancedSearch: false,
    };
  }

  @autobind
  _renderSearchItem(props) {
    return (
      <SearchInput title="用户名：" placeholder="请输入用户名" hideButton={this.state.advancedSearch} />
    );
  }

  @autobind
  _renderAdvancedSearch() {
    if (this.state.advancedSearch) {
      return (
        <div className="search-advanced">
          <SearchInput type="date" title="时间：" hideButton={true} />
          <SearchInput type="range" title="金额：" hideButton={true} />
          <Button
            className="search-advanced-button"
            type="primary"
            size="large"
            icon="search"
            onClick={() => console.log('### advenced search ###')}
          >搜索</Button>
        </div>
      );
    }
    return (<div />);
  }

  render() {
    return (
      <div className="search">
        <div className="search-basic">
          <SearchInput title="用户名：" placeholder="请输入用户名" hideButton={this.state.advancedSearch} />
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
}

export default Search;

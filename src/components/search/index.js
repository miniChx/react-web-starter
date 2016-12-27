/**
 * Created by baoyinghai on 12/27/16.
 */
import React from 'react';
import Search from './Search';

export default class SearchDemo extends React.Component {

  static propTypes = {
    dataSource: React.PropTypes.array,
    onSearch: React.PropTypes.func,
  };

  render() {
    return (
      <Search
        dataSource={this.props.dataSource}
        onSearch={value => this.props.onSearch && this.props.onSearch(value)}
      />
    );
  }
}

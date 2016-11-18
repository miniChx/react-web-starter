import React from 'react';
import { Table, Button } from 'mxa';
import { autobind } from 'core-decorators';
import bodyCreator from './bodyCreator';
import FilterCreator from './filterCreator';

export default class StartProcess extends React.Component {

  @autobind
  columnAdapter() {
    return this.props.dataSource && this.props.dataSource.displayFields &&
      this.props.dataSource.displayFields.map(item => {
        return {
          ...item,
          title: item.fieldText,
          dataIndex: item.fieldName.split('.')[0],
          key: item.fieldName,
          render: (text, record, index) => bodyCreator(item.displayStyle)(item, text, record, index)
        };
      });
  }

  @autobind
  dataSourceAdapter() {
    return this.props.dataSource && this.props.dataSource.data &&
      this.props.dataSource.data.map((item, index) => {
        return { ...item, key: index };
      });
  }

  render() {
    return (
      <div>
        <FilterCreator {...this.props} data={this.props.dataSource && this.props.dataSource.filters} />
        <Table
          columns={this.columnAdapter()}
          dataSource={this.dataSourceAdapter()}
        />
      </div>
    );
  }
}

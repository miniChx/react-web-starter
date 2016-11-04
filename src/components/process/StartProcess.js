import React from 'react';
import { Table, Button } from 'mxa';
import { autobind } from 'core-decorators';
import renderCreator from './displayStyleAnalyse';

/* eslint-disable */
export default class StartProcess extends React.Component {

  constructor(props) {
    super(props);
  }

  @autobind
  columnAdapter() {
    return this.props.dataSource && this.props.dataSource.displayFields && this.props.dataSource.displayFields.map((item) => {
      return {
        ...item,
        title: item.fieldText,
        dataIndex: item.fieldName.split('.')[0],
        key: item.fieldName,
        render:(text, record, index) => {
          renderCreator(item.displayStyle)(item, text, record, index);
        }
      }
    }) || [];
  }

  @autobind
  dataSourceAdapter() {
    return this.props.dataSource && this.props.dataSource.data && this.props.dataSource.data.map((item, index) => {
      return {
        ...item,
        key: index
      }
    }) || [];
  }

  render() {
    return (
      <div>
        <Table
          columns={this.columnAdapter()}
          dataSource={this.dataSourceAdapter()}
        />
      </div>
    );
  }
}

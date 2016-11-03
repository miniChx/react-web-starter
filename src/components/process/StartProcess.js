import React from 'react';
import { Table, Button } from 'mxa';
import { autobind } from 'core-decorators';
import { getValueByKey } from '../../common/utils/MapUtils';

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
        render:(text, record) => {
          switch(item.displayStyle) {
            case 'Block':
              return (<span>{text}</span>);
              break;
            case 'Hyperlink':
              return (<a href="#">{item.displayText}</a>);
              break;
            case 'Button':
              return ( <Button
                type="ghost"
                onClick={() => console.log(item)}
              >
                {getValueByKey(record, '', ...item.fieldName.split('.'))}
              </Button>);
              break;
            default:
              return (<span>{text}</span>);
          }
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

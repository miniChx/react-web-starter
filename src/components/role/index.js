/**
 * Created by cui on 16/11/8.
 */
/* eslint-disable */
import React from 'react';
import { autobind } from 'core-decorators';
import { Table, Button } from 'mxa';

export default class Role extends React.Component {

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
          render:(text, record, index) => renderCreator(item.displayStyle)(item, text, record, index)
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
    const columns = [{
      title: '角色编号',
      dataIndex: 'roleCode',
      key: 'roleCode',
    }, {
      title: '角色名称',
      dataIndex: 'roleValue',
      key: 'roleValue',
    }];

    const dataSource = [
      {
        "roleCode": "Role1",
        "roleValue": "角色1"
      },
      {
        "roleCode": "Role10",
        "roleValue": "角色10"
      },
      {
        "roleCode": "Role11",
        "roleValue": "角色11"
      }
    ];

    return (
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
        />
      </div>
    );
  }
}

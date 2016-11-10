/**
 * Created by cui on 16/11/8.
 */
/* eslint-disable */
import React from 'react';
import { autobind } from 'core-decorators';
import { Table, Button, Modal, Input } from 'mxa';
import ModalPage from './modalPage';

import styles from '../../styles/views/listview.less';

export default class Role extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  @autobind
  _renderDeleteRole(text, record) {
    Modal.confirm({
      title: '删除该角色?',
      onOk() {
        console.log(record);
        Modal.success({
          title: '删除成功',
        });
      },
      onCancel() {},
    });
  }

  @autobind
  _renderColumnAction(text, record) {
    return (
      <div className={styles.toolbar}>
        <ModalPage title="详情" className={styles.topButton} record={record} />
        <ModalPage title="授权" className={styles.topButton} record={record} />
        <Button className={styles.inlineButton} onClick={() => this._renderDeleteRole(record)}>删除</Button>
      </div>
    );
  }

  @autobind
  _dataSourceAdapter() {
    return this.props.dataSource && this.props.dataSource.roles && this.props.dataSource.roles.map((item, index) => {
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
    }, {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 200,
      render: (text, record) => this._renderColumnAction(text, record),
    }];

    return (
      <div>
        <ModalPage title="添加角色" className={styles.topButton} />
        <Table
          columns={columns}
          dataSource={this._dataSourceAdapter()}
        />
      </div>
    );
  }
}

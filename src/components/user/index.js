/**
 * Created by geweimin on 16/11/8.
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
      title: '删除该用户?',
      onOk() {
        //TODO: 联调删除用户的接口
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
        <ModalPage title="详情" className={styles.inlineButton} record={record} mode="detail" />
        <a className={styles.inlineButton} onClick={() => this._renderDeleteRole(record)}>删除</a>
      </div>
    );
  }

  @autobind
  _dataSourceAdapter() {
    return this.props.dataSource && this.props.dataSource.users && this.props.dataSource.users.map((item, index) => {
        return {
          ...item,
          key: index
        }
      }) || [];
  }

  @autobind
  _getAddUserCode() {
    let userCode = 1;
    this.props.dataSource && this.props.dataSource.users && this.props.dataSource.users.map((item, index) => {
      item.userCode > userCode ? userCode = item.userCode : null;
    });
    return userCode + 1;
  }

  render() {
    const columns = [{
      title: '用户编号',
      dataIndex: 'userCode',
      key: 'userCode',
    }, {
      title: '用户名称',
      dataIndex: 'userValue',
      key: 'userValue',
    }, {
      title: '密码',
      dataIndex: 'userPass',
      key: 'userPass',
    }, {
      title: '用户邮箱',
      dataIndex: 'userEmail',
      key: 'userEmail',
    }, {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (text, record) => this._renderColumnAction(text, record),
    }];

    return (
      <div>
        <ModalPage title="添加用户" className={styles.topButton} mode="add" userCode={this._getAddUserCode()}/>
        <Table
          columns={columns}
          dataSource={this._dataSourceAdapter()}
        />
      </div>
    );
  }
}

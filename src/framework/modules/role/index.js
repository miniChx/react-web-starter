/**
 * Created by cui on 16/11/8.
 */
/* eslint-disable */
import React from 'react';
import { autobind } from 'core-decorators';
import { Table, Modal, Input } from 'mxa';
import ModalPage from './modalPage';

import * as RoleActions from '../../actions/role';

import styles from '../../styles/views/listview.less';

export default class Role extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dataSource: this.props.dataSource
    }
  }

  @autobind
  _refreshRole() {
    this.props.exec(() => {
      return RoleActions.findAllRole()
        .then((dataSource) => {
          this.setState({
            dataSource
          });
        })
    })
  }

  @autobind
  _renderDeleteRole(record) {
    const self = this;
    Modal.confirm({
      title: '删除该角色?',
      onOk() {
        self.props.exec(() => {
          return RoleActions.deleteRole({
            roleCode: record.roleCode
          })
            .then(() => {
                Modal.success({
                  title: '删除成功'
                });
                self._refreshRole();
            })
        });
      },
      onCancel() {},
    });
  }

  @autobind
  _renderColumnAction(record) {
    return (
      <div className={styles.toolbar}>
        <ModalPage title="详情" className={styles.inlineButton} record={record} mode="detail"/>
        <ModalPage
          title="菜单"
          className={styles.inlineButton}
          record={record}
          mode="menu"
          actions={RoleActions}
          refreshRole={this._refreshRole}
          {...this.props}
        />
        <ModalPage
          title="按钮"
          className={styles.inlineButton}
          record={record}
          mode="button"
          actions={RoleActions}
          refreshRole={this._refreshRole}
          {...this.props}
        />
        <a className={styles.inlineButton} onClick={() => this._renderDeleteRole(record)}>删除</a>
      </div>
    );
  }

  @autobind
  _dataSourceAdapter() {
    return this.state.dataSource && this.state.dataSource.roles && this.state.dataSource.roles.map((item, index) => {
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
      render: (record) => this._renderColumnAction(record),
    }];

    return (
      <div>
        <ModalPage
          title="添加角色" className={styles.topButton} mode="add" actions={RoleActions} refreshRole={this._refreshRole} {...this.props}
        />
        <Table
          columns={columns}
          dataSource={this._dataSourceAdapter()}
        />
      </div>
    );
  }
}

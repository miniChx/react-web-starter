/**
 * Created by cui on 16/11/8.
 */
/* eslint-disable */
import React from 'react';
import { autobind } from 'core-decorators';
import { Table, Button } from 'mxa';

import styles from '../../styles/views/listview.less';

export default class Role extends React.Component {

  constructor(props) {
    super(props);
  }

  @autobind
  _renderColumnAction() {
    return (
      <div>
        <a className={styles.inlineButton}>详情</a>
        <a className={styles.inlineButton}>编辑</a>
        <a className={styles.inlineButton}>删除</a>
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
      render: () => this._renderColumnAction(),
    }];

    return (
      <div>
        <Button className={styles.topButton}>添加角色</Button>
        <Button className={styles.topButton}>角色授权</Button>
        <Table
          columns={columns}
          dataSource={this._dataSourceAdapter()}
        />
      </div>
    );
  }
}

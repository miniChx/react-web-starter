/**
 * Created by geweimin on 16/11/8.
 */
/* eslint-disable */
import React from 'react';
import { autobind } from 'core-decorators';
import { Table, Button, Modal, Input, Row, Col, Select, Radio } from 'mxa';
import sha256 from 'sha256';
import { ModalPage } from './modalPage';

import styles from '../../../styles/views/listview.less';
import { deleteAccountServer, findAccountById, searchAccountServer, updateAccountServer, findAllRolesByUserId } from '../../actions/account';
import { longRunExec } from '../../system/longRunOpt';

const Option = Select.Option;
const RadioGroup = Radio.Group;

export default class AccountList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: this.props.dataSource.pageResult,
      visible: false,
      status: 'ACCOUNT_STATUS_ALL',
      currentPage: 1,
      orderField: {orderField: "id", orderType: "Asc"},
      roleList: []
    }
  }

  @autobind
  _renderDelete(record) {
    const that = this;
    Modal.confirm({
      title: '删除该用户?',
      onOk() {
        //TODO: 联调删除用户的接口
        longRunExec(() => {
          return findAccountById({
            id: record.id
          }).then((data) => {
            return deleteAccountServer(
              {
                id: record.id,
                userName: record.userName,
                mobileNo: record.mobileNo,
                email: record.email,
                password: data.password,
                status: 'DELETE'
              }
            );
          }).then(() => {
            Modal.success({
              title: '删除成功',
            });
            that._searchItem();
          });
        });
      },
      onCancel() {},
    });
  }

  @autobind
  _renderFreezing(record) {
    const that = this;
    let title = '冻结该用户？';
    let successTitle = '冻结成功';
    if (record.status === 'FREEZING') {
      title = '解冻该用户？';
      successTitle = '解冻成功';
    }
    Modal.confirm({
      title: title,
      onOk() {
        //TODO: 联调删除用户的接口
        longRunExec(() => {
          return findAccountById({
            id: record.id
          }).then((data) => {
            return updateAccountServer(
              {
                id: record.id,
                userName: record.userName,
                mobileNo: record.mobileNo,
                email: record.email,
                password: sha256(data.password),
                status: record.status === 'FREEZING' ? 'ACTIVE' : 'FREEZING'
              }
            );
          }).then(() => {
            Modal.success({
              title: successTitle,
            });
            that._searchItem();
          });
        });
      },
      onCancel() {},
    });
  }

  @autobind
  _renderColumnAction(text, record) {
    return (
      <div className={styles.toolbar}>
        <ModalPage title="详情" className={styles.inlineButton} record={record} mode="detail" renderResult={this._searchItem} />
        <ModalPage title="设置角色" className={styles.inlineButton} record={record} mode="setRole" renderResult={this._searchItem} roleList={this.state.roleList} />
        <a disabled={record.status === 'DELETE' ? true : false}
           className={styles.inlineButton}
           onClick={record.status === 'DELETE' ? null : () => this._renderFreezing(record)}>
          {record.status === 'FREEZING' ? '解冻' : '冻结'}
        </a>
        <a disabled={record.status === 'DELETE' ? true : false}
           className={styles.inlineButton}
           onClick={record.status === 'DELETE' ? null : () => this._renderDelete(record)}>
          删除
        </a>
      </div>
    );
  }

  @autobind
  _dataSourceAdapter() {
    let contentList = this.state.dataSource.contentList;
    return this.state.dataSource && contentList && contentList.map((item, index) => {
        return {
          ...item,
          key: index
        }
      }) || [];
  }

  @autobind
  _getAddUserCode() {
    let contentList = this.state.dataSource.contentList;
    let id = 1;
    this.state.dataSource && contentList && contentList.map((item, index) => {
      item.id > id ? id = item.id : null;
    });
    return id + 1;
  }

  @autobind
  _selectChange(value) {
    this.setState({
      status: value
    })

    this._searchItem({
      filterFieldCodes: [value],
      orderFields: [
        this.state.orderField
      ],
      pageIndex: this.state.currentPage,
      itemsPerPage: 10
    });
  }

  @autobind
  _searchItem(params) {
    if (!params) {
      params = {
        filterFieldCodes: [this.state.status],
        orderFields: [
          this.state.orderField
        ],
        pageIndex: this.state.current,
        itemsPerPage: 10
      }
    }
    //TODO: 筛选
    longRunExec(()=> {
      return searchAccountServer(params).then(d => {
        // TODO： 更新数据
        this.setState({
          dataSource: d
        });
      });
    });
  }

  @autobind
  _changePage(current) {
    this._searchItem({
      filterFieldCodes: [this.state.status],
      orderFields: [
        this.state.orderField
      ],
      pageIndex: current,
      itemsPerPage: 10
    })
  }

  @autobind
  _handleTableChange(pagination, filters, sorter) {
    console.log('sorter:' + sorter.field);
    console.log('sorter:' + sorter.order);
    if (typeof(sorter.order) === "undefined") {
      return;
    }
    this._searchItem({
      filterFieldCodes: [this.state.status],
      orderFields: [
        {
          orderField: sorter.field,
          orderType: sorter.order === 'descend' ? 'Desc' : 'Asc'
        }
      ],
      pageIndex: this.state.currentPage,
      itemsPerPage: 10
    });
  }

  render() {
    // eslint-disable-next-line arrow-body-style
    let columns = this.props.dataSource.fields.map(item => ({
      key: item.index,
      title: item.description,
      dataIndex: item.name,
      sorter: item.name === 'id' || item.name === 'status' ? true : false
    }));

    columns.push({
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 200,
      render: (text, record) => this._renderColumnAction(text, record),
    });

    const pagination = {
      total: this.state.dataSource.totalItems,
      onChange: (current) => {
        this.setState({
          currentPage: current
        });
        this._changePage(current);
      },
    };

    return (
      <div>
        <div className={styles.marginBottom}>
          <span>筛选：</span>
          <Select
            showSearch
            style={{ width: 100 }}
            defaultValue="全部"
            optionFilterProp="children"
            onChange={this._selectChange}
            notFoundContent=""
          >
            {this.props.dataSource.filterItems[0].options.map((item, index) => {
              return (
                <Option key={'option' + index} value={item.displayCode}>{item.displayName}</Option>
              );
            })}
          </Select>
        </div>
        <ModalPage title="添加用户" mode="add" userCode={this._getAddUserCode()} renderResult={this._searchItem} />
        <Table
          columns={columns}
          dataSource={this._dataSourceAdapter()}
          pagination={pagination}
          onChange={this._handleTableChange}
        />
      </div>
    );
  }
}

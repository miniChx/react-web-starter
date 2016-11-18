/**
 * Created by geweimin on 16/11/8.
 */
/* eslint-disable */
import React from 'react';
import { autobind } from 'core-decorators';
import { Table, Button, Modal, Input, Row, Col, Select } from 'mxa';
import { ModalPage } from './modalPage';

import styles from '../../styles/views/listview.less';
import { deleteAccountServer, findAccountById, searchAccountServer } from '../../actions/account';
import { longRunExec } from '../../system/longRunOpt';

const Option = Select.Option;
export default class AccountList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: this.props.dataSource.pageResult,
      visible: false,
      status: 'ACCOUNT_STATUS_ALL',
      currentPage: 1,
      orderField: {orderField: "id", orderType: "Asc"}
    }
  }

  @autobind
  _renderDeleteRole(record) {
    const that = this;
    const state = this.state;
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
            return searchAccountServer({
              filterFieldCodes: [state.status],
              orderFields: [
                state.orderField
              ],
              pageIndex: state.currentPage,
              itemsPerPage: 10
            }).then(d => {
              that.setState({
                dataSource: d
              });
            });
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
        <a disabled={record.status === 'DELETE' ? true : false}
           className={styles.inlineButton}
           onClick={record.status === 'DELETE' ? null : () => this._renderDeleteRole(record)}>
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
      status: value,
      currentPage: 1
    })

    this._searchItem({
      filterFieldCodes: [value],
      orderFields: [
        this.state.orderField
      ],
      pageIndex: 1,
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

  render() {
    // eslint-disable-next-line arrow-body-style
    let columns = this.props.dataSource.fields.map(item => ({
      key: item.index,
      title: item.description,
      dataIndex: item.name,
    }));

    columns.push({
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 100,
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
        />
      </div>
    );
  }
}

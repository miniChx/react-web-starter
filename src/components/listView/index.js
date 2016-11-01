/**
 * Created by baoyinghai on 10/24/16.
 */

import React from 'react';

import { Button, Table, Icon, Select } from 'mxa';
import SearchInput from '../searchInput/index';

const Option = Select.Option;
/* eslint-disable */
import { dispatch } from '../../service/DispatchService';
/* eslint-disable */
import { testFetch } from '../../actions/test/fetchTest';
/* eslint-disable */
import { transColumn, transData, transButtons, transFilter } from './columnAdapter';
import styles from '../../styles/views/cps.less';
import { PAGE_TYPE_DETAIL } from '../../actions/types';
import { getInitData } from '../../actions/pageContainer';
import { longRunExec } from '../../system/longRunOpt';
import { getButtonsActionName } from '../../common/utils/ButtonsUtils';

const setupList = (...props) => {
  return ListView
};

/* eslint-disable */
export default class ListView extends React.Component {

  constructor(props){
    super(props);
    this.initComponent = this.initComponent.bind(this);
    this.state = {
      data: [],
      columns: [],
      buttons: [],
      filterItems: [],
      pagination: {},
      // fetch state
      pageIndex: 1,
      itemsPerPage: 10,
      filterFieldCodes: [],
      orderFields: []
    };
    this.createFilterItem = this.createFilterItem.bind(this);
    this.handleChangeOfSelect = this.handleChangeOfSelect.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    this.renderActions = this.renderActions.bind(this);
    this.goToDetail = this.goToDetail.bind(this);
  }

  componentWillReceiveProps(next) {
    if (next.initData) {
      this.initComponent(next.initData);
    }
  }

  buttonClick(e) {
    // TODO: 按钮类型的判断
    console.log('button click: ', e.key);
  }

  goToDetail(record) {
    console.log(record);
    this.props.jump(
      '/AccountList/detail',
      { modal: 'i am modal ' },
      { domainType: PAGE_TYPE_DETAIL, needFetch: false, record, columns: this.state.columns }
    );
  }

  renderActions(text, record) {
    return (
      <span>
        <a href="#">删除</a>
        <span className="mx-divider" />
        <a onClick={() => this.goToDetail(record)}>详情</a>
      </span>
    );
  }

  // 跳转到该界面后, 有的界面需要fetch数据, 此方法会被执行
  initComponent(data) {
    this.setState({
      data: transData(data && data.pageResult && data.pageResult.contentList),
      columns: transColumn(data.fields).concat([{title: '操作', dataIndex: '', key: 'x', render: this.renderActions}]),
      buttons: transButtons(data.buttons),
      filterItems: transFilter(data.filterItems),
      pagination: {
        total: data && data.pageResult && data.pageResult.totalItems,
        showSizeChanger: true,
        onShowSizeChange: (current, pageSize) => {
          this.paginationSizeChange(current, pageSize)
        },
        onChange: (current) => {
          this.paginationChange(current);
        },
      }
    });
  }

  handleChangeOfSelect(e) {
    console.log('Select: ' + e);
  }

  createFilterItem(filter) {
    return filter && filter.options &&
      filter.options.map((item) => {
        return (
          <Option key={item.displayCode} value={item.displayCode}>{item.displayName}</Option>
        );
      });
  }

  onChange = (pagination, filters, sorter) => {
    // console.log('params', pagination, filters, sorter);
    this.getData();
  };

  paginationChange = (current) => {
    // console.log('Current: ', current);
    this.setState({
      pageIndex: current
    }, () => {
      this.getData();
    });
  };

  paginationSizeChange = (current, pageSize) => {
    // console.log('Current: ', current, '; PageSize: ', pageSize);
    this.setState({
      itemsPerPage: pageSize
    }, () => {
      this.getData();
    })
  };

  getData = () => {
    const url = '/' + getButtonsActionName(this.state.data.buttons, 'search');
    const requestBody = {
      pageIndex: this.state.pageIndex,
      itemsPerPage: this.state.itemsPerPage,
      filterFieldCodes: this.state.filterFieldCodes,
      orderFields: [
        // {orderField: 'Status', orderType: 'Asc'},
        // {orderField: 'Age', orderType: 'Asc'}
      ]
    };
    longRunExec(() => getInitData(url, requestBody)
      .then(data => {
        this.initComponent(data);
      }));
  };

  render() {
    if (this.state.columns && this.state.columns.length > 0) {
      return (
        <div className={styles.paddingWraper}>
          <div className={styles.paddingWraper}>
            {
              this.state.filterItems.map((filter) => {
                return (
                  <span key={filter.fieldName} >
                    <span>{' ' + filter.displayName + ': '}</span>
                    <Select defaultValue={filter.options[0].displayCode} className={styles.filterSelect} onChange={this.handleChangeOfSelect}>
                      {this.createFilterItem(filter)}
                    </Select>
                  </span>
                );
              })
            }
          </div>
          <div className={styles.paddingWraper}>
            {this.state.buttons.map((btn) => {
              return (
                <Button key={btn.key} type="ghost" onClick={() => this.buttonClick(btn.text)} >{btn.text}</Button>
              );
            })}
          </div>
          <SearchInput placeholder={"搜索"}/>
          <Table
            columns={this.state.columns}
            dataSource={this.state.data}
            sortOrder={false}
            pagination={this.state.pagination}
            onChange={this.onChange}
          />
        </div>
      );
    }
    return null;
  }
};

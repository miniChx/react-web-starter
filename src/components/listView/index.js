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
    };
    this.createFilterItem = this.createFilterItem.bind(this);
    this.handleChangeOfSelect = this.handleChangeOfSelect.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    this.renderActions = this.renderActions.bind(this);
    this.goToDetail = this.goToDetail.bind(this);
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.initComponent(this.props.data);
    }, 0);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
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
        showSizeChanger: true
      }
    });

  }

  handleChangeOfSelect(e) {
    console.log(e);
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
    console.log('params', pagination, filters, sorter);
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
    return (
      <div />
    );
  }
};

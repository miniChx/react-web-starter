/**
 * Created by baoyinghai on 10/24/16.
 */

import React from 'react';

import { Button, Table, Icon, Select } from 'mxa';
const Option = Select.Option;
import { dispatch } from '../../service/DispatchService';
import { testFetch } from '../../actions/test/fetchTest';
import { transColumn, transData, transButtons, transFilter } from './columnAdapter';
import styles from '../../styles/views/cps.less';
import { PAGE_TYPE_DETAIL } from '../../actions/types';


const setupList = (...props) => {
  return ListView
};

export default class ListView extends React.Component {

  constructor(props){
    super(props);
    this.initComponent = this.initComponent.bind(this);
    this.state = {
      data: [],
      columns: [],
      buttons: [],
      filterItems: [],
    };
    this.rowSelection = {
      onChange(selectedRowKeys, selectedRows) {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect(record, selected, selectedRows) {
        console.log(record, selected, selectedRows);
      },
      onSelectAll(selected, selectedRows, changeRows) {
        console.log(selected, selectedRows, changeRows);
      }
    };
    this.createFilterItem = this.createFilterItem.bind(this);
    this.handleChangeOfSelect = this.handleChangeOfSelect.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick(e) {
    // TODO: 按钮类型的判断
    if (e === '详情') {
      this.props.jump(
        '/AccountList/detail',
        { modal: 'i am modal ' },
        { domainType: PAGE_TYPE_DETAIL, needFetch: false }
      );
    }
  }

  // 跳转到该界面后, 有的界面需要fetch数据, 此方法会被执行
  initComponent(data) {
    this.setState({
      data: transData(data && data.pageResult && data.pageResult.contentList),
      columns: transColumn(data.fields),
      buttons: transButtons(data.buttons),
      filterItems: transFilter(data.filterItems),
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
          <Table rowSelection={this.rowSelection} columns={this.state.columns} dataSource={this.state.data} sortOrder={false}/>
        </div>
      );
    }
    return (
      <div className={styles.paddingWraper} >
        <span>数据加载中...</span>
      </div>
    );

  }
};

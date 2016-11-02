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
import { getButtonsActionNameWithActionText } from '../../common/utils/ButtonsUtils';
import { constructFilterFieldCodes, constructOrderFields } from '../../common/utils/SelectUtils';

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
    if (e.text === '筛选') {
      this.getData();
    }
  }

  goToDetail(record) {
    console.log(record);
    this.state.buttons && this.state.buttons.every((item) => {
      if (item.text === '详情') {
        this.props.jump(item.link, {param: { id: record.id}}, PAGE_TYPE_DETAIL, 'Page');
        return false;
      }
      return true;
    });
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
      orderFields: constructOrderFields(data && data.orderItems),
      pagination: {
        total: data && data.pageResult && data.pageResult.totalItems,
        showSizeChanger: true,
        // onShowSizeChange: (current, pageSize) => {
        //   this.paginationSizeChange(current, pageSize)
        // },
        // onChange: (current) => {
        //   this.paginationChange(current);
        // },
      }
    });
  }

  handleChangeOfSelect(e, filter) {
    console.log('Select: ' + e);

    this.setState({
      filterFieldCodes: constructFilterFieldCodes(this.state.filterItems, this.state.filterFieldCodes, e)
    });
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
    // this.getData();
    this.setState({
      pageIndex: pagination.current,
      itemsPerPage: pagination.pageSize
    }, () => {
      this.getData();
    });
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
    const url = getButtonsActionNameWithActionText(this.state.buttons, '筛选');
    // const requestBody = {
    //   pageIndex: this.state.pageIndex,
    //   itemsPerPage: this.state.itemsPerPage,
    //   filterFieldCodes: this.state.filterFieldCodes,
    //   orderFields: [
    //     // {orderField: 'Status', orderType: 'Asc'},
    //     // {orderField: 'Age', orderType: 'Asc'}
    //   ]
    // };
    // longRunExec(() => getInitData(url, requestBody)
    //   .then(data => {
    //     this.initComponent(data);
    //   }));
    this.initComponent(mockData);
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
                <Button key={btn.key} type="ghost" onClick={() => this.buttonClick(btn)} >{btn.text}</Button>
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

const mockData = {
  "pageResult": {
    "pageIndex": 1,
    "itemsPerPage": 10,
    "totalPages": 3,
    "contentList": [
      {
        "id": 1,
        "email": "lfzhu@amarsoft.com",
        "mobileNo": "13811111111",
        "password": "123456",
        "realName": "德鲁大叔",
        "department": "研发部",
        "jobTitle": "攻城狮",
        "telephoneNo": "111",
        "address": "无锡",
        "status": "ACTIVE",
        "age": 1
      },
      {
        "id": 3,
        "email": "qliu@amarsoft.com",
        "mobileNo": "13833333333",
        "password": "12345678",
        "realName": "白小飞",
        "department": "z经理办公室",
        "jobTitle": "技术总监",
        "telephoneNo": "333",
        "address": "江西",
        "status": "ACTIVE",
        "age": 3
      },
      {
        "id": 4,
        "email": "email1",
        "mobileNo": "111",
        "password": "111",
        "realName": "111",
        "department": "部门1",
        "jobTitle": "job1",
        "telephoneNo": "444",
        "address": "山东",
        "status": "ACTIVE",
        "age": 4
      },
      {
        "id": 7,
        "email": "email13",
        "mobileNo": "mobileNo13",
        "password": "password13",
        "realName": "realName13",
        "department": "department13",
        "jobTitle": "jobTitle13",
        "telephoneNo": "777",
        "address": "address",
        "status": "ACTIVE",
        "age": 7
      },
      {
        "id": 9,
        "email": "email4",
        "mobileNo": "mobileNo4",
        "password": "password4",
        "realName": "realName4",
        "department": "department4",
        "jobTitle": "jobTitle4",
        "telephoneNo": "999",
        "address": "address",
        "status": "ACTIVE",
        "age": 9
      },
      {
        "id": 1,
        "email": "lfzhu@amarsoft.com",
        "mobileNo": "13811111111",
        "password": "123456",
        "realName": "德鲁大叔",
        "department": "研发部",
        "jobTitle": "攻城狮",
        "telephoneNo": "111",
        "address": "无锡",
        "status": "ACTIVE",
        "age": 1
      },
      {
        "id": 3,
        "email": "qliu@amarsoft.com",
        "mobileNo": "13833333333",
        "password": "12345678",
        "realName": "白小飞",
        "department": "z经理办公室",
        "jobTitle": "技术总监",
        "telephoneNo": "333",
        "address": "江西",
        "status": "ACTIVE",
        "age": 3
      },
      {
        "id": 4,
        "email": "email1",
        "mobileNo": "111",
        "password": "111",
        "realName": "111",
        "department": "部门1",
        "jobTitle": "job1",
        "telephoneNo": "444",
        "address": "山东",
        "status": "ACTIVE",
        "age": 4
      },
      {
        "id": 7,
        "email": "email13",
        "mobileNo": "mobileNo13",
        "password": "password13",
        "realName": "realName13",
        "department": "department13",
        "jobTitle": "jobTitle13",
        "telephoneNo": "777",
        "address": "address",
        "status": "ACTIVE",
        "age": 7
      },
      {
        "id": 9,
        "email": "email4",
        "mobileNo": "mobileNo4",
        "password": "password4",
        "realName": "realName4",
        "department": "department4",
        "jobTitle": "jobTitle4",
        "telephoneNo": "999",
        "address": "address",
        "status": "ACTIVE",
        "age": 9
      },
    ],
    "totalItems": 24
  },
  "itemsPerPage": 10,
  "fields": [
    {
      "name": "id",
      "index": 1,
      "entityShortName": "A",
      "type": "Long",
      "description": "编号",
      "groupId": 1,
      "isVisible": false,
      "displayComponent": {
        "componentType": "Input",
        "items": null
      }
    },
    {
      "name": "email",
      "index": 2,
      "entityShortName": "A",
      "type": "String",
      "description": "邮箱",
      "groupId": 1,
      "isVisible": true,
      "displayComponent": {
        "componentType": "Input",
        "items": null
      }
    },
    {
      "name": "mobileNo",
      "index": 3,
      "entityShortName": "A",
      "type": "String",
      "description": "手机号",
      "groupId": 1,
      "isVisible": true,
      "displayComponent": {
        "componentType": "Input",
        "items": null
      }
    },
    {
      "name": "password",
      "index": 4,
      "entityShortName": "A",
      "type": "String",
      "description": "密码",
      "groupId": 1,
      "isVisible": true,
      "displayComponent": {
        "componentType": "Input",
        "items": null
      }
    },
    {
      "name": "realName",
      "index": 5,
      "entityShortName": "A",
      "type": "String",
      "description": "真实姓名",
      "groupId": 1,
      "isVisible": true,
      "displayComponent": {
        "componentType": "Input",
        "items": null
      }
    },
    {
      "name": "department",
      "index": 6,
      "entityShortName": "A",
      "type": "String",
      "description": "部门",
      "groupId": 1,
      "isVisible": true,
      "displayComponent": {
        "componentType": "Input",
        "items": null
      }
    },
    {
      "name": "jobTitle",
      "index": 7,
      "entityShortName": "A",
      "type": "String",
      "description": "职位",
      "groupId": 1,
      "isVisible": true,
      "displayComponent": {
        "componentType": "Input",
        "items": null
      }
    },
    {
      "name": "telephoneNo",
      "index": 8,
      "entityShortName": "A",
      "type": "String",
      "description": "座机号",
      "groupId": 1,
      "isVisible": true,
      "displayComponent": {
        "componentType": "Input",
        "items": null
      }
    },
    {
      "name": "address",
      "index": 9,
      "entityShortName": "A",
      "type": "String",
      "description": "地址",
      "groupId": 1,
      "isVisible": true,
      "displayComponent": {
        "componentType": "Input",
        "items": null
      }
    },
    {
      "name": "status",
      "index": 10,
      "entityShortName": "A",
      "type": "String",
      "description": "状态",
      "groupId": 1,
      "isVisible": true,
      "displayComponent": {
        "componentType": "Input",
        "items": null
      }
    },
    {
      "name": "age",
      "index": 11,
      "entityShortName": "A",
      "type": "Integer",
      "description": "年龄",
      "groupId": 1,
      "isVisible": false,
      "displayComponent": {
        "componentType": "Input",
        "items": null
      }
    }
  ],
  "buttons": [
    {
      "buttonDescription": "添加",
      "displayPosition": "top",
      "interactiveType": "Model",
      "domainLink": "/AccountDetail/add",
      "domainType": "Detail",
      "roles": [
        "Role1",
        "Role2",
        "Role3"
      ]
    },
    {
      "buttonDescription": "删除",
      "displayPosition": "top",
      "interactiveType": "Action",
      "actionName": "/AccountDetail/deleteById",
      "requestParameters": [],
      "roles": [
        "Role1",
        "Role2",
        "Role3"
      ]
    },
    {
      "buttonDescription": "详情",
      "displayPosition": "top",
      "interactiveType": "Model",
      "domainLink": "/AccountDetail/render",
      "domainType": "Detail",
      "requestParameters": [],
      "roles": [
        "Role1",
        "Role2",
        "Role3"
      ]
    },
    {
      "buttonDescription": "筛选",
      "actionType": "search",
      "domainLink": null,
      "actionName": "/AccountList/search",
      "roles": [
        "Role1",
        "Role2",
        "Role3"
      ]
    }
  ],
  "filterItems": [
    {
      "fieldName": "Status",
      "displayName": "状态",
      "displaySeq": 1,
      "options": [
        {
          "displayName": "全部",
          "displayCode": "ACCOUNT_STATUS_ALL",
          "displaySeq": 1,
          "isSelected": false
        },
        {
          "displayName": "有效用户",
          "displayCode": "ACCOUNT_STATUS_ACTIVE",
          "displaySeq": 2,
          "isSelected": true
        },
        {
          "displayName": "已删除用户",
          "displayCode": "ACCOUNT_STATUS_DELETED",
          "displaySeq": 3,
          "isSelected": false
        }
      ]
    },
    {
      "fieldName": "Age",
      "displayName": "年龄",
      "displaySeq": 1,
      "options": [
        {
          "displayName": "全部",
          "displayCode": "ACCOUNT_AGE_ALL",
          "displaySeq": 1,
          "isSelected": true
        },
        {
          "displayName": "小于5岁",
          "displayCode": "ACCOUNT_AGE_LT_5",
          "displaySeq": 2,
          "isSelected": false
        },
        {
          "displayName": "5-10岁",
          "displayCode": "ACCOUNT_AGE_BT_5_AND_10",
          "displaySeq": 3,
          "isSelected": false
        },
        {
          "displayName": "大于10岁",
          "displayCode": "ACCOUNT_AGE_GT_10",
          "displaySeq": 4,
          "isSelected": false
        }
      ]
    }
  ],
  "orderItems": [
    {
      "fieldName": "Status",
      "displayName": "状态",
      "displaySeq": 1,
      "isSelected": true,
      "isAsc": true
    },
    {
      "fieldName": "Age",
      "displayName": "年龄",
      "displaySeq": 2,
      "isSelected": false,
      "isAsc": false
    }
  ]
}

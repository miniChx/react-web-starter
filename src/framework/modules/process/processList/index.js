import React from 'react';
import { Table, Button } from 'mxa';
import { autobind } from 'core-decorators';
import bodyCreator from './bodyCreator';
import FilterCreator from './filterCreator';
import { clearParam, getParam } from './filterCreator/filterParam';
import { PFetch } from '../../../system/fetch';

export default class StartProcess extends React.Component {

  @autobind
  columnAdapter() {
    return this.props.dataSource && this.props.dataSource.displayFields &&
      this.props.dataSource.displayFields.map(item => {
        return {
          ...item,
          title: item.fieldText,
          dataIndex: item.fieldName.split('.')[0],
          key: item.fieldName,
          render: (text, record, index) => bodyCreator(item.displayStyle)(item, text, record, index, { ...this.props, filterData: this.filterData })
        };
      });
  }

  @autobind
  filterData() {
    const param = getParam();
    const urlAry = this.props.domainLink.split('/');
    urlAry.pop();
    urlAry.push('search');
    const searchUrl = urlAry.join('/');
    console.log(searchUrl);
    this.props.exec(() => {
      return PFetch('/' + searchUrl, param).then(response => {
        console.log('', response);
        // this.props.freshData && this.props.freshData(response);
        // if (this.props.freshData) {
        //  const { setState, state } = this.props.freshData;
        //  const tag = { ...state.data, data: response.data };
        //  setState && setState(tag);
        // }
        this.props.freshData && this.props.freshData({ ...this.props.dataSource, data: response.data });
      });
    });
  }

  @autobind
  dataSourceAdapter() {
    return this.props.dataSource && this.props.dataSource.data &&
      this.props.dataSource.data.map((item, index) => {
        return { ...item, key: index };
      });
  }

  render() {
    return (
      <div>
        <FilterCreator {...this.props} filterData={this.filterData} data={this.props.dataSource && this.props.dataSource.filters} />
        <Table
          columns={this.columnAdapter() || []}
          dataSource={this.dataSourceAdapter() || []}
        />
      </div>
    );
  }
}

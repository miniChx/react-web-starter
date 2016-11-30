/* eslint-disable no-console */

import React from 'react';
import { autobind } from 'core-decorators';
import { Table, Select } from 'mxa';
import { Button, SearchInput } from '../../../../components';

import styles from '../../../styles/views/listview.less';

import { constructOrderFields, constructFilterFieldCodes } from './SelectUtils';

const Option = Select.Option;

class ListView extends React.Component {
  constructor(props) {
    super(props);
    // initial state
    this.state = this._processData(this.props.dataSource);
  }

  @autobind
  _renderColumnAction(text, record, buttons) { // eslint-disable-line class-methods-use-this
    // console.log('text: ', text);
    // console.log('record: ', record);
    return (
      <div>
        {
          buttons.map(item => (
            <Button
              {...item}
              key={item.buttonDescription}
              record={record}
              className={styles.inlineButton}
            />
          ))
        }
      </div>
    );
  }

  @autobind
  _processData(data) {
    const buttons = {
      inline: data.buttons && data.buttons.filter(item => item.displayPosition === 'inline'),
      top: data.buttons && data.buttons.filter(item => item.displayPosition === 'top'),
      search: data.buttons && data.buttons.filter(item => item.actionType === 'search'),
    };

    // eslint-disable-next-line arrow-body-style
    const columns = data.fields && data.fields.map(item => ({
      key: item.index,
      title: item.description,
      dataIndex: item.name,
    }));

    // add operation
    if (buttons && buttons.inline && buttons.inline.length > 0) {
      columns.push({
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (text, record) => this._renderColumnAction(text, record, buttons.inline),
      });
    }

    const filters = data.filterItems;
    // eslint-disable-next-line arrow-body-style
    const dataSource = data.pageResult.contentList.map(item => ({ key: item.id, ...item }));
    const pagination = {
      total: data && data.pageResult && data.pageResult.totalItems,
      showSizeChanger: true
    };

    const pageIndex = data && data.pageResult && data.pageResult.pageIndex;
    const itemsPerPage = data && data.pageResult && data.pageResult.itemsPerPage;
    const filterFieldCodes = [];
    const orderFields = constructOrderFields(data.filterItems);

    return {
      columns,
      dataSource,
      buttons,
      pagination,
      filters,
      pageIndex,
      itemsPerPage,
      filterFieldCodes,
      orderFields
    };
  }

  @autobind
  _onFilterChange(value) { // eslint-disable-line
    console.log(`selected ${value}`);
    this.setState({
      filterFieldCodes: constructFilterFieldCodes(this.state.filters, this.state.filterFieldCodes, value)
    }, () => {
      this._onSearch();
    });
  }

  @autobind
  _onChange(pagination, filters, sorter) { // eslint-disable-line
    console.log('params', pagination, filters, sorter);
    this.setState({
      pageIndex: pagination.current,
      itemsPerPage: pagination.pageSize
    }, () => {
      this._onSearch();
    });
  }

  @autobind
  _onSearch() {
    let url = null;
    this.state.buttons.search.forEach((item) => { // eslint-disable-line
      if (item.actionType === 'search') {
        url = item.actionName;
      }
    });

    const param = {
      pageIndex: this.state.pageIndex,
      itemsPerPage: this.state.itemsPerPage,
      filterFieldCodes: this.state.filterFieldCodes,
      orderFields: this.state.orderFields
    };
    this.props.exec(() => this.props.fetch(url, param)
      .then(data => {
        let contentList;
        switch (this.state.pageIndex) {
          case 1:
            contentList = 'contentList';
            break;
          case 2:
            contentList = 'contentList2';
            break;
          case 3:
            contentList = 'contentList3';
            break;
          default: contentList = 'contentList';
        }
        this.setState({
          dataSource: data[contentList],
        });
      }));
  }

  @autobind
  _renderFilters() {
    return (
      <div>
        {
          this.state.filters && this.state.filters.map(filter => {
            const selectedValues = filter.options.filter(option => option.isSelected);
            const defaultOption = selectedValues.length > 0 ? selectedValues[0] : filter.options[0];
            return (
              <div key={filter.displaySeq} className={styles.filter}>
                <span>{' ' + filter.displayName + ': '}</span>
                <Select
                  className={styles.select}
                  defaultValue={defaultOption.displayCode}
                  onChange={this._onFilterChange}
                >
                  {
                    filter.options.map(option => (
                      <Option key={option.displaySeq} value={option.displayCode}>{option.displayName}</Option>
                    ))
                  }
                </Select>
              </div>
            );
          })
        }
      </div>
    );
  }

  @autobind
  _renderTopButtons() {
    // TODO. Get select row record
    const record = {};
    return (
      <div>
        {
          this.state.buttons && this.state.buttons.top && this.state.buttons.top.map(item => (
            <Button
              type="button"
              buttonProps={{
                type: 'ghost',
              }}
              {...item}
              key={item.buttonDescription}
              record={record}
              className={styles.topButton}
            />
          ))
        }
      </div>
    );
  }

  render() {
    if (this.state.columns && this.state.columns.length > 0) {
      return (
        <div className={styles.listview}>
          {this._renderFilters()}
          <div className={styles.toolbar}>
            {this._renderTopButtons()}
            <div className={styles.search}>
              <SearchInput placeholder="搜索" />
            </div>
          </div>
          <Table
            columns={this.state.columns}
            dataSource={this.state.dataSource}
            sortOrder={false}
            pagination={this.state.pagination}
            onChange={this._onChange}
          />
        </div>
      );
    }

    return null;
  }
}

export default ListView;

/* eslint-disable no-console */

import React from 'react';
import { autobind } from 'core-decorators';
import { Table } from 'mxa';
import isEmpty from 'lodash/isEmpty';
import { ExtendButton, Search } from '../../../components';
import { LIST_SELECTTYPE, BUTTON_POSITION } from '../../constant/dictCodes';

import styles from '../../styles/views/listview.less';

import { handleOrderItems, arr2obj } from './util';

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
      <div className={styles.inlineToolbar}>
        {
          buttons.map(item => (
            <ExtendButton
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
    const buttons = { inline: [], top: [], search: [] };
    if (data.buttons) {
      buttons.inline = data.buttons.filter(item => item.displayPosition === BUTTON_POSITION.INLINE);
      buttons.top = data.buttons.filter(item => item.displayPosition === BUTTON_POSITION.TOP);
      buttons.search = data.buttons.filter(item => item.actionType === 'search');
    }

    const orderItems = handleOrderItems(data.orderItems);
    const ordered = data.orderItems && data.orderItems.length > 0;
    // eslint-disable-next-line arrow-body-style
    let mainEntityKey = '';
    const columns = data.fields && data.fields.map(item => {
      if (item.isMainEntityKey) mainEntityKey = item.name;
      return {
        key: item.index,
        title: item.description,
        dataIndex: item.name,
        sorter: !!orderItems[item.name],
      };
    });

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

    const fieldsObject = arr2obj(data.fields, 'name');
    const filters = data.filterItems.map(filter => {
      // const fieldData = data.fields.find(field => field.name === filter.fieldName);
      const fieldData = fieldsObject[filter.fieldName];
      if (fieldData) {
        return {
          ...filter,
          type: fieldData.displayComponent.componentType,
          extra: fieldData.displayComponent.dictionaryItems,
        };
      }
      return filter;
    });

    // eslint-disable-next-line arrow-body-style
    const dataSource = data.pageResult.contentList.map((content, index) => {
      const output = { key: index };
      Object.keys(content).forEach(field => {
        if (fieldsObject[field].displayComponent.componentType === 'SELECT') {
          output[field] = fieldsObject[field].displayComponent.dictionaryItems
            .find(dict => dict.code === content[field]).value;
        } else {
          output[field] = content[field];
        }
      });

      return output;
    });

    const pageIndex = data && data.pageResult && data.pageResult.pageIndex;
    const itemsPerPage = data && data.pageResult && data.pageResult.itemsPerPage;
    const pagination = {
      total: data && data.pageResult && data.pageResult.totalItems,
      pageSize: itemsPerPage,
      showSizeChanger: false,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 项`,
    };

    const selectedType = LIST_SELECTTYPE.CHECKBOX;
    return {
      columns,
      dataSource,
      buttons,
      pagination,
      filters,
      pageIndex,
      itemsPerPage,
      requestFilterFields: [],
      ordered,
      orderFields: [],
      mainEntityKey,
      selectedType,
      selectedRowKeys: [],
      selectedRows: [],
    };
  }

  @autobind
  _onFilterChange(value) {
    console.log(`_onFilterChange ${value}`);
    this.setState({
      requestFilterFields: value,
    }, () => {
      this._onSearch();
    });
  }

  @autobind
  _onChange(pagination, filters, sorter) { // eslint-disable-line
    console.log('params', pagination, filters, sorter);
    if (this.state.ordered && !isEmpty(sorter)) {
      const orderFields = [];
      orderFields.push({
        orderField: sorter.field,
        orderType: sorter.order === 'descend' ? 'DESC' : 'ASC',
      });

      this.setState({
        pageIndex: pagination.current,
        itemsPerPage: pagination.pageSize,
        orderFields,
      }, () => {
        this._onSearch();
      });
    } else {
      this.setState({
        pageIndex: pagination.current,
        itemsPerPage: pagination.pageSize,
        // orderFields,
      }, () => {
        this._onSearch();
      });
    }
  }

  @autobind
  _onSearch() {
    const url = this.props.domainLink.replace(/\/(\S)*$/g, '/search');
    // this.state.buttons.search.forEach((item) => { // eslint-disable-line
    //   if (item.actionType === 'search') {
    //     url = item.actionName;
    //   }
    // });

    const param = {
      pageIndex: this.state.pageIndex,
      itemsPerPage: this.state.itemsPerPage,
      variantFields: null,
      requestFilterFields: this.state.requestFilterFields,
      requestOrderFields: this.state.orderFields,
    };
    this.props.exec(() => this.props.fetch(url, param)
      .then(data => {
        const dataSource = data.pageResult.contentList.map(item => ({ key: item.id, ...item }));
        this.setState({ dataSource });
      }));
  }

  @autobind
  _renderTopButtons() {
    return (
      <div>
        {
          this.state.buttons && this.state.buttons.top && this.state.buttons.top.map(item => (
            <ExtendButton
              type="button"
              buttonProps={{
                type: 'ghost',
              }}
              {...item}
              disabled={!(this.state.selectedType && this.state.selectedRowKeys.length > 0)}
              key={item.buttonDescription}
              selectedType={this.state.selectedType}
              record={this.state.selectedRows}
              className={styles.topButton}
            />
          ))
        }
      </div>
    );
  }


  @autobind
  _onRowClick(record, index) {
    console.log('onRowClick ==> ', record, index);

    const selectedIndex = this.state.selectedRowKeys.indexOf(record.key);
    if (selectedIndex > -1) {
      this.setState({
        selectedRowKeys: this.state.selectedRowKeys.filter(item => item !== record.key),
        selectedRows: this.state.selectedRows.filter(item => item.key !== record.key),
      });
    } else {
      this.setState({
        selectedRowKeys: this.state.selectedRowKeys.concat(record.key),
        selectedRows: this.state.selectedRows.concat(record),
      });
    }
  }

  render() {
    // const selectedRows = [];
    const rowSelection = {
      type: this.state.selectedType,
      onChange: (selectedRowKeys, selectedRows) => {
        console.log('onChange ==> ', `selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({ selectedRowKeys, selectedRows });
      },
      onSelect: (record, selected) => {
        console.log('onSelect ==> ', record, selected);
        // this.setState({ selectedRows });
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log('onSelectAll ==> ', selected, selectedRows, changeRows);
        this.setState({ selectedRows });
      },
      selectedRowKeys: this.state.selectedRowKeys,
    };

    if (this.state.columns && this.state.columns.length > 0) {
      return (
        <div className={styles.listview}>
          <div className={styles.toolbar}>
            {this._renderTopButtons()}
            <Search data={this.state.filters} onSearch={this._onFilterChange} />
          </div>
          <Table
            rowSelection={rowSelection}
            columns={this.state.columns}
            dataSource={this.state.dataSource}
            sortOrder={false}
            pagination={this.state.pagination}
            onChange={this._onChange}
            onRowClick={this._onRowClick}
          />
        </div>
      );
    }

    return (<div />);
  }
}

export default ListView;

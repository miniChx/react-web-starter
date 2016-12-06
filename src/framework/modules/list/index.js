/* eslint-disable no-console */

import React from 'react';
import { autobind } from 'core-decorators';
import { Table } from 'mxa';
import isEmpty from 'lodash/isEmpty';
import { ExtendButton, Search } from '../../../components';
import { LIST_SELECTTYPE, BUTTON_POSITION } from '../../constant/dictCodes';

import styles from '../../styles/views/listview.less';

import { arr2obj, handleFilterItems, handleOrderItems, handleContentList } from './util';

class ListView extends React.Component {
  constructor(props) {
    super(props);
    // initial state
    this.state = this._processData(this.props.dataSource);
  }

  @autobind
  _renderColumnAction(text, record, buttons, mainEntityKey) { // eslint-disable-line class-methods-use-this
    // console.log('text: ', text);
    // console.log('record: ', record);
    return (
      <div className={styles.inlineToolbar}>
        {
          buttons.map(item => (
            <ExtendButton
              {...item}
              inline={true}
              key={record[mainEntityKey]}
              mainEntityKey={mainEntityKey}
              record={record}
              className={styles.inlineButton}
              query={this.props.query}
            />
          ))
        }
      </div>
    );
  }

  @autobind
  _processData(data) {
    const buttons = { inline: [], top: [] };
    if (data.buttons) {
      buttons.inline = data.buttons.filter(item => item.displayPosition === BUTTON_POSITION.INLINE);
      buttons.top = data.buttons.filter(item => item.displayPosition === BUTTON_POSITION.TOP);
    }

    const orderItems = handleOrderItems(data.orderItems);
    const ordered = data.orderItems && data.orderItems.length > 0;
    // eslint-disable-next-line arrow-body-style
    let mainEntityKey = '';
    const columns = [];
    data.fields && data.fields.forEach(item => {
      if (item.isMainEntityKey) mainEntityKey = item.name;
      if (item.isVisible) {
        columns.push({
          key: item.index,
          title: item.description,
          dataIndex: item.name,
          sorter: !!orderItems[item.name],
        });
      }
    });

    // add operation
    if (buttons && buttons.inline && buttons.inline.length > 0) {
      columns.push({
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (text, record) => this._renderColumnAction(text, record, buttons.inline, mainEntityKey),
      });
    }

    const variantFields = data.variantFields.map(variant => {
      return {
        fieldName: variant,
        fieldValue: this.props.query[variant],
      };
    });

    const fieldsObject = arr2obj(data.fields, 'name');
    const filters = handleFilterItems(data.filterItems, fieldsObject);
    const dataSource = handleContentList(data.pageResult.contentList, fieldsObject);

    const pageIndex = data && data.pageResult && data.pageResult.pageIndex;
    const itemsPerPage = data && data.pageResult && data.pageResult.itemsPerPage;
    const pagination = {
      total: data && data.pageResult && data.pageResult.totalItems,
      pageSize: itemsPerPage,
      showSizeChanger: false,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 项`,
    };

    // const selectedType = LIST_SELECTTYPE.CHECKBOX;
    const selectedType = data.selectType;
    return {
      columns,
      dataSource,
      buttons,
      pagination,
      fieldsObject,
      filters,
      pageIndex,
      itemsPerPage,
      requestFilterFields: [],
      variantFields,
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
    const param = {
      pageIndex: this.state.pageIndex,
      itemsPerPage: this.state.itemsPerPage,
      variantFields: this.state.variantFields,
      requestFilterFields: this.state.requestFilterFields,
      requestOrderFields: this.state.orderFields,
    };
    this.props.exec(() => this.props.fetch(url, param)
      .then(data => {
        const dataSource = handleContentList(data.pageResult.contentList, this.state.fieldsObject);
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
              inline={false}
              buttonProps={{
                type: 'ghost',
              }}
              {...item}
              disabled={item.isSelectToJump && this.state.selectedRowKeys.length <= 0}
              key={item.buttonDescription}
              mainEntityKey={this.state.mainEntityKey}
              selectedType={this.state.selectedType}
              record={this.state.selectedRows}
              className={styles.topButton}
              query={this.props.query}
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
    const rowSelection = this.state.selectedType === LIST_SELECTTYPE.INLINE ? null : {
      type: this.state.selectedType.toLowerCase(),
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
      console.log('Search[data] ===> ', this.state.filters);
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
            // onRowClick={this._onRowClick}
          />
        </div>
      );
    }

    return (<div />);
  }
}

export default ListView;

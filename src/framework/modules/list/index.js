/* eslint-disable no-console */

import React, { PropTypes } from 'react';
import { autobind } from 'core-decorators';
import { Table, Button, Row, Col, Tooltip } from 'mxa';
// import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { trimStart } from 'lodash/string';
import { ExtendButton, BodyTitle, Search } from '../../../components';
import SearchPlus from '../../../components/search/SearchPlus';
import SuperSearch from '../../../components/search/SuperSearch';
import { LIST_SELECTTYPE, BUTTON_POSITION, BUTTON_RELATEDDATA } from '../../constant/dictCodes';
import { arr2obj, handleFilterItems, handleOrderItems, handleContentList } from './util';
import SideMenu from '../info/sideMenu';
import { getMenuItemByKeyPaths, getMenuItemByFunc, getMenuItemAndPathByFunc, searchBeforeAndAfter } from '../../utils/MenuHelper';
import processMenu from './processMenu';
import { templeteTypes } from '../../pageContainer/config';

class ListView extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    isModal: PropTypes.bool,
    modalCallback: PropTypes.func,
    inject: PropTypes.object, // inject for customize, key is 'buttonDescription'
    hiddenSearchBar: PropTypes.bool,
  };

  static defaultProps = {
    prefixCls: 'mx-list',
    isModal: false,
    hiddenSearchBar: false
  };

  constructor(props) {
    super(props);
    // initial state
    this.contentList = this.props.dataSource.pageResult.contentList;
    this.state = this._processData(this.props.dataSource);
  }

  @autobind
  _renderColumnAction(text, record, buttons, mainEntityKey) {
    const { prefixCls, query, inject } = this.props;
    const toolbarClassName = `${prefixCls}-inline-toolbar`;
    const buttonClassName = `${prefixCls}-inline-button`;
    return (
      <div key="inline-operation" className={toolbarClassName}>
        {
          buttons.map((item, index) => (
            <ExtendButton
              {...item}
              inline={true}
              key={index}
              mainEntityKey={mainEntityKey}
              record={record}
              inject={inject}
              className={buttonClassName}
              query={query}
              onRefresh={this._onSearch}
            />
          ))
        }
      </div>
    );
  }

  @autobind
  _processData(data) {
    const buttons = { row: [], top: [] };
    if (!this.props.isModal && data.buttons) {
      buttons.row = data.buttons.filter(item => item.displayPosition === BUTTON_POSITION.ROW);
      buttons.top = data.buttons.filter(item => item.displayPosition === BUTTON_POSITION.TOP);
    }

    const orderItems = handleOrderItems(data.orderItems);
    const ordered = data.orderItems && data.orderItems.length > 0;
    let mainEntityKey = '';
    const columns = [];
    data.fields && data.fields.sort((a, b) => a.index - b.index).forEach((item, index) => {
      if (item.isMainEntityKey) mainEntityKey = item.name;
      if (item.isVisible) {
        columns.push({
          key: index,
          title: item.description,
          dataIndex: item.name,
          sorter: !!orderItems[item.name],
          render: text => {
            if (typeof text === 'string' && text.length > 20) {
              return (
                <Tooltip title={text} placement="top">
                  <span>{text.substring(0, 18) + '...'}</span>
                </Tooltip>
              );
            }
            return (
              <span>text</span>
            );
          }
        });
      }
    });

    // fix first column
    // if (columns.length > 0) {
    //   columns[0].fixed = true;
    // }

    // add operation
    if (!this.props.isModal && buttons && buttons.row && buttons.row.length > 0) {
      columns.push({
        key: 'inline-operation',
        title: '操作',
        dataIndex: 'inline-operation',
        // fixed: 'right',
        // width: 300,
        render: (text, record) => this._renderColumnAction(text, record, buttons.row, mainEntityKey),
      });
    }

    const variantFields = {};
    data.variantFields.forEach(variant => {
      variantFields[variant] = this.props.query ? this.props.query[variant] : '';
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
    const selectedType = this.props.isModal ? LIST_SELECTTYPE.RADIO : data.selectType;
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
      openMenuKeys: [],
      selectedMenuKeys: null,
      isAdvanceSearch: false
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
  _onChange(pagination, filters, sorter) {
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
    const searchUrl = trimStart(this.props.domainLink.replace(/^(.*\/)render(\w*)$/, '$1search$2'), '/');
    const param = {
      pageIndex: this.state.pageIndex,
      itemsPerPage: this.state.itemsPerPage,
      requestParamsBean: this.state.variantFields, // issue #5
      requestFilterFields: this.state.requestFilterFields,
      requestOrderFields: this.state.orderFields,
    };
    this.props.exec(() => this.props.fetch(searchUrl, param)
      .then(data => {
        const dataSource = handleContentList(data.contentList, this.state.fieldsObject);
        this.contentList = data.contentList;
        const pagination = {
          total: data && data.totalItems,
          pageSize: data.itemsPerPage,
          showSizeChanger: false,
          showQuickJumper: true,
          showTotal: total => `共 ${total} 项`,
        };

        this.setState({
          dataSource,
          pagination,
          selectedRowKeys: [],
          selectedRows: [],
        });
      }));
  }

  @autobind
  _renderTopButtons() {
    const { prefixCls, query, inject } = this.props;
    const buttonClass = `${prefixCls}-button`;
    if (this.props.isModal) {
      return (
        <div>
          <Button
            buttonProps={{
              type: 'ghost',
            }}
            className={buttonClass}
            onClick={() => this.props.modalCallback && this.props.modalCallback(this.contentList[this.state.selectedRowKeys])}
            disabled={this.state.selectedRowKeys.length <= 0}
          >确定</Button>
        </div>
      );
    }

    const btns = this.state.buttons && this.state.buttons.top && this.state.buttons.top.map(item => (
      <ExtendButton
        type="button"
        inline={false}
        buttonProps={{
          type: 'ghost',
        }}
        {...item}
        disabled={(item.relatedData === BUTTON_RELATEDDATA.SINGLE && this.state.selectedRowKeys.length !== 1)
          || (item.relatedData === BUTTON_RELATEDDATA.MULTIPLE && this.state.selectedRowKeys.length < 1)}
        key={item.buttonDescription}
        mainEntityKey={this.state.mainEntityKey}
        selectedType={this.state.selectedType}
        record={this.state.selectedRows}
        className={buttonClass}
        query={query}
        inject={inject}
        isModal={this.props.isModal}
        modalCallback={this.props.modalCallback}
        onRefresh={this._onSearch}
      />
      ));
    if (this.props.modalCallback) {
      btns.push(<Button className={buttonClass} onClick={this.props.modalCallback}>返回</Button>);
    }
    if (this.props.createTopButtons) {
      this.props.createTopButtons(btns);
      return null;
    }
    return (
      <div>
        {btns}
      </div>
    );
  }


  @autobind
  _onRowClick(record, index) {
    if (this.state.selectedType === LIST_SELECTTYPE.INLINE) return;
    console.log('onRowClick ==> ', record, index);

    const selectedIndex = this.state.selectedRowKeys.indexOf(record.key);
    if (selectedIndex > -1) {
      this.setState({
        selectedRowKeys: this.state.selectedRowKeys.filter(item => item !== record.key),
        selectedRows: this.state.selectedRows.filter(item => item.key !== record.key),
      });
    } else if (this.state.selectedType === LIST_SELECTTYPE.RADIO) {
      this.setState({
        selectedRowKeys: [record.key],
        selectedRows: [record],
      });
    } else {
      this.setState({
        selectedRowKeys: this.state.selectedRowKeys.concat(record.key),
        selectedRows: this.state.selectedRows.concat(record),
      });
    }
  }

  @autobind
  _onAdvanceSearch() {
    this.setState({
      isAdvanceSearch: !this.state.isAdvanceSearch
    });
  }

  renderList() {
    // const selectedRows = [];
    const hiddenSearchBar = this.props.hiddenSearchBar;
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

    // {!this.props.hiddenSearchBar && (<Search dataSource={this.state.filters} onSearch={this._onFilterChange} />)}
    if (this.state.columns && this.state.columns.length > 0) {
      // console.log('Search[data] ===> ', this.state.filters);
      const { prefixCls } = this.props;
      const tableHeaderClass = `${prefixCls}-table-header`;
      const toolbarClass = `${prefixCls}-toolbar`;
      const listContainer = `${prefixCls}-container`;
      return (
        <div className={prefixCls}>
          <BodyTitle title={this.props.menuValue} />
          <div className={tableHeaderClass}>
            <div className={toolbarClass}>
              {this._renderTopButtons()}
              {
                !hiddenSearchBar &&
                (
                  <SearchPlus
                    dataSource={this.state.filters[0]}
                    onSearch={this._onFilterChange}
                    onAdvanceSearch={this._onAdvanceSearch}
                  />
                )
              }
            </div>
            {this.state.isAdvanceSearch && (
              <div>
                <SuperSearch dataSource={this.state.filters} onSearch={this._onFilterChange} />
              </div>
            )}
          </div>
          <div className={listContainer}>
            <Table
              bordered={true}
              locale={{ emptyText: '无符合条件的相关数据' }}
              rowSelection={rowSelection}
              columns={this.state.columns}
              dataSource={this.state.dataSource}
              sortOrder={false}
              pagination={this.state.pagination}
              onChange={this._onChange}
              onRowClick={this._onRowClick}
              prefixCls="mx-table-self"
            />
          </div>
        </div>
      );
    }

    return (<div />);
  }

  @autobind
  createRegex(key) {
    const append = templeteTypes.join('|');
    return new RegExp('^.*\\w+' + key + '(' + append + ')/.*$');
  }

  // 授信评估申请
  @autobind
  testApply(str) {
    const reg = this.createRegex('Apply');
    return reg.test(str);
  }

  // 授信评估审核
  @autobind
  testReview(str) {
    const reg = this.createRegex('Review');
    return reg.test(str);
  }

  @autobind
  changeMenuSelect(menuCode, menu) {
    return getMenuItemAndPathByFunc(item => item.menuCode === menuCode, menu);
  }

  @autobind
  changeMenuProps(menuCode, cb) {
    this.setState({
      selectedMenuKeys: menuCode,
      openMenuKeys: this.changeMenuSelect(menuCode, this.getSideMenu(this.props.domainLink)).openKeys
    }, cb && cb);
  }

  @autobind
  menuClick(e) {
    const m = getMenuItemByKeyPaths(e.keyPath || [e.key], this.getSideMenu(this.props.domainLink));
    this.changeMenuProps(m.menuCode, () => {
      // TODO: 与后台协商
      const filterRequest = {
        fieldName: 'serialNo',
        maxValue: '',
        minValue: '',
        value: '123',
      };
      this._onFilterChange(filterRequest);
    });
  }

  getSideMenu() {
    if (this.testApply(this.props.domainLink)) {
      return processMenu.apply;
    }
    return processMenu.review;
  }

  render() {
    const main = this.renderList();

    console.log('my link:', this.props.domainLink);
    if (this.testApply(this.props.domainLink) || this.testReview(this.props.domainLink)) {
      const menu = this.getSideMenu(this.props.domainLink);
      return (
        <Row>
          <Col span={4}>
            <SideMenu
              openKeys={this.state.openMenuKeys}
              selectedKeys={this.state.selectedMenuKeys ?
                [...this.state.openMenuKeys, this.state.selectedMenuKeys]
                : menu[0].menuCode}
              menu={menu}
              menuClick={this.menuClick}
            />
          </Col>
          <Col span={19} offset={1}>{main}</Col>
        </Row>
      );
    }
    return main;
  }
}

export default ListView;

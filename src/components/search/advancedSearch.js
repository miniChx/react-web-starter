/**
 * Created by baoyinghai on 12/27/16.
 */
import React, { PropTypes } from 'react';
import { Button, Row, Col, Icon } from 'mxa';
import SearchInput from './SearchInput';

export default class Search extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    dataSource: PropTypes.array,
    onSearch: PropTypes.func,
  };

  static defaultProps = {
    dataSource: [],
    prefixCls: 'mx-search',
  };

  constructor(props) {
    super(props);
    // initial state
    this.state = {
      advancedSearch: false,
      requestFilterFields: [],
    };
  }

  _onChange = value => {
    const { requestFilterFields } = this.state;
    const updated = requestFilterFields.some((element, index, array) => {
      if (value.fieldName === element.fieldName) {
        array[index] = value;
        return true;
      }
      return false;
    });

    if (!updated) {
      requestFilterFields.push(value);
    }
    this.setState({ requestFilterFields });
  }

  _onSearch = () => {
    this.props.onSearch && this.props.onSearch(this.state.requestFilterFields);
  }

  _onDefaultSearch = value => {
    this.props.onSearch && this.props.onSearch(value);
  }

  _clear = () => {
    this.setState({ requestFilterFields: [] });
    this._renderAdvancedSearch(true);
  }

  _renderAdvancedSearch = f => {
    let advanced = null;
    if (this.state.advancedSearch) {
      const { prefixCls, dataSource } = this.props;
      if (dataSource && dataSource.length > 1) {
        const advancedData = dataSource.slice(1);
        advanced = (
          <div>
            <div className={`${prefixCls}-advanced-search-form`}>
              <Row>
                {
                  advancedData.map(item => (
                    <Col span="8">
                      <SearchInput
                        key={item.fieldName + Math.random()}
                        type={item.type}
                        operatorType={item.operatorType}
                        code={item.fieldName}
                        title={item.displayName}
                        extra={item.extra}
                        onChange={this._onChange}
                        requestFilterFields={f ? [] : this.props.requestFilterFields}
                      />
                    </Col>
                  ))
                }
              </Row>
              <div className={`${prefixCls}-advanced-button-bar`}>
                <Button
                  className={`${prefixCls}-advanced-button`}
                  onClick={this._onSearch}
                >检索</Button>
                <Button
                  className={`${prefixCls}-advanced-button-cancel`}
                  onClick={this._switchModel}
                >取消</Button>
                <Button
                  className={`${prefixCls}-advanced-button-clear`}
                  onClick={this._clear}
                >清空</Button>
              </div>
            </div>
            <div className={`${prefixCls}-close-btn`}>
              <Icon onClick={this._switchModel} type="up" className={'advanced-button-close'} />
            </div>
          </div>
        );
      }
    }
    this.props.updateAdvancedSearch(advanced);
  }

  _switchModel = () => {
    this.setState({
      advancedSearch: !this.state.advancedSearch,
    }, () => {
      if (!this.state.advancedSearch) {
        const { dataSource } = this.props;
        if (dataSource && dataSource.length > 0) {
          const defaultSearch = dataSource[0];
          const requestFilterFields = this.state.requestFilterFields.filter(item => item.fieldName === defaultSearch.fieldName);
          this.setState({
            requestFilterFields,
          });
        }
      }
      this._renderAdvancedSearch();
    });
  }

  render() {
    const { prefixCls, dataSource } = this.props;
    if (dataSource && dataSource.length > 0) {
      return (
        <div className={`${prefixCls}`} >
          <div className={`${prefixCls}-basic`}>
            {dataSource.length > 1 ? <Button
              type="primary"
              icon={this.state.advancedSearch ? 'up-circle-o' : 'down-circle-o'}
              className={`${prefixCls}-basic-switch`}
              onClick={this._switchModel}
            >高级搜索</Button>
              : null}
          </div>
        </div>
      );
    }
    return null;
  }
}

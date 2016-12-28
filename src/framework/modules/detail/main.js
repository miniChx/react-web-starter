/**
 * Created by baoyinghai on 11/10/16.
 */
import React from 'react';
import { Form, Input, DatePicker, Col, Select, Tooltip, Icon, Cascader, Row, Button, Checkbox, Modal } from 'mxa';
import { autobind } from 'core-decorators';
import { goBack, replace } from 'react-router-redux';

import appStyle from '../../styles/views/detail.less';
import renderFuc from './displayComp/index';
import styles from '../../styles/views/listview.less';
import { PFetch } from '../../system/fetch';
import { dispatch } from '../../service/DispatchService';
import { CONTAINER_PRE } from '../../routes';
import { getValueByKey } from '../../utils/MapUtils';
import { AnHref } from '../info';
import SwitchContainer from './switchContainer';
import { VIEW, EDIT } from './constant';
import { BUTTON_POSITION, BUTTON_RELATEDDATA } from '../../constant/dictCodes';
import { ExtendButton } from '../../../components';

const FormItem = Form.Item;

class Detail extends React.Component {
  /* eslint-disable */
  static propTypes = {
    inject: React.PropTypes.object,
    model: React.PropTypes.oneOf([VIEW, EDIT]).isRequired,
    createRules: React.PropTypes.func, // 自定义表单校验 // record
    beforeSubmit: React.PropTypes.func, // 表单提交之前 // values, callback(v)
    afterSubmit: React.PropTypes.func, // 表单提交之后  //  err
    dataSource: React.PropTypes.object.isRequired,
    renderAnalyser: React.PropTypes.func, // 自定义渲染标单项 // componentName
    renderButtonsSelf: React.PropTypes.func, // 自定义渲染按钮
  };

  static defaultProps = {
    prefixCls: 'mx-detail',
  };

  constructor(props) {
    super(props);
    const data = this.dataFieldsAdapter(this.props.dataSource);
    this.state = {
      passwordDirty: false,
      fields: data,
      detailResult: this.props.dataSource.detailResult
    };
  }

  // 设置显示 和 必填
  @autobind
  changeDataSourceVisable(fieldSetting = {}) {
    const fieldList = this.props.dataSource.fields && this.props.dataSource.fields.map(field => {
        if (fieldSetting[field.name]) {
          const isVisible = fieldSetting[field.name].isVisible;
          if (isVisible === true || isVisible === false) {
            field.isVisible = isVisible;
          }
          if (fieldSetting[field.name].rules) {
            const isRequired = fieldSetting[field.name].rules.isRequired;
            if (isRequired === true || isRequired === false) {
              field.isRequired = isRequired;
            }
          }
        }
        return field;
    });
    const data = { ...this.props.dataSource, fields: fieldList};
    this.setState({ fields: this.dataFieldsAdapter(data) });
  }

  @autobind
  changeInitValue(values) {
    const detailResult = this.props.dataSource.detailResult;
    this.setState({ detailResult: { ...detailResult, ...values } });

  }

  @autobind
  injectFormValidate(dataSource) {
    if (this.props.inject && this.props.inject.formValidate) {
      return dataSource.fields.map(field => {
        if (this.props.inject.formValidate[field.name]) {
          field.formValidate = this.props.inject.formValidate[field.name];
        }
        return field;
      });
    }
    return dataSource.fields;
  }

  // 注入 过滤 分组
  @autobind
  dataFieldsAdapter(dataSource) {
    const fieldMap = {};
    this.injectFormValidate(dataSource).forEach(f => {
      if (!fieldMap[f.groupId]) {
        fieldMap[f.groupId] = [];
      }
      fieldMap[f.groupId].push(f);
    });
    const ret = [];
    Object.keys(fieldMap).forEach(key => {
      ret.push(fieldMap[key]);
    });
    return ret;
  }

  @autobind
  createReqParam() {
    let params = {};
    if (this.props && this.props.params) {
      params = this.props.params;
    }
    return { ...params, ...getValueByKey(this.props, {}, 'query') };
  }

  @autobind
  realSubmit(func, values) {
    const rest = this.createReqParam();
    const self = this;
    const original = this.props.dataSource.detailResult || {};
    return func && func({ ...original, ...rest, ...values });
  }

  @autobind
  handleSubmit(func) {
    const self = this;
    this.props.form.validateFieldsAndScroll({ force: true }, (err, values) => {
      if (!err) {
        if (self.props.beforeSubmit) {
          self.props.beforeSubmit(values, (v = values) => {
            self.realSubmit(func,  v);
          })
        } else {
          self.realSubmit(func, values);
        }
      }
    });
  }

  @autobind
  handlePasswordBlur(e) {
    const value = e.target.value;
    this.setState({ passwordDirty: this.state.passwordDirty || !!value });
  }

  @autobind
  handleChageState(e) {
    this.props.changeState(e);
  }

  @autobind
  _onSearch() {
    console.log();
  }

  @autobind
  _renderColumnAction(displayPosition) {
    const { prefixCls, query, inject } = this.props;
    const buttonClass = `${prefixCls}-button`;
    let buttons = (this.props.dataSource.buttons || []).filter(btn => {
      if (displayPosition === BUTTON_POSITION.TOP || displayPosition === BUTTON_POSITION.BOTTOM){
        return (btn && btn.displayPosition) === displayPosition;
      }
      return true;
    });
    if (!this.props.renderButtonsSelf) {
      buttons = buttons.map(item => {
        if (item.isEditButton) {
          return (
            <Button onClick={this.props.changeState}>{this.props.model === EDIT ? '返回' : '编辑'}</Button>
          );
        } else {
          return (
            <ExtendButton
              type="button"
              inline={false}
              buttonProps={{
                type: 'ghost',
              }}
              {...item}
              disabled={false}
              key={item.buttonDescription}
              className={buttonClass}
              query={query}
              inject={inject}
              submitFuc={item.relatedData === BUTTON_RELATEDDATA.FORM && ((func) => this.handleSubmit(func))}
              onRefresh={this._onSearch}
            />
          );
        }
      });
    } else {
      buttons = this.props.renderButtonsSelf(buttons, displayPosition);
    }

    if (this.props.createTopButtons && displayPosition === BUTTON_POSITION.TOP) {
      this.props.createTopButtons(buttons || []);
      return null;
    }
    return (
      <div>
        {buttons}
      </div>
    );
  }

  renderForm(data, fields, i) {
    const titleF = fields[0];
    return (
      <SwitchContainer key={titleF.groupName + i} bar={(<AnHref title={titleF.groupName} shortTitle={titleF.groupShortName} href={'#title' + titleF.groupId} />)} >
        {this.renderGroupItem(data, fields)}
      </SwitchContainer>
    );
  }

  renderGroupItem(data, fields) {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    return (
      <div className={appStyle.formBox} >
        <Row gutter={40} className={appStyle.cell}>
          {fields.filter(f => f.isVisible).map((item, index) => {
            return (
              <Col key={index} span={(24 / data.columnNumber) || 12}>
                {renderFuc(formItemLayout, item, getFieldDecorator, this.state.detailResult, this.props, this.changeDataSourceVisable, this.changeInitValue)}
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }

  @autobind
  renderBody() {
    if (this.state.fields && this.state.fields.length === 1) {
      return (
        <div>
          <span>{this.state.fields[0][0].groupName}</span>
          {this.renderGroupItem(this.props.dataSource, this.state.fields[0])}
        </div>
      );
    } else {
      return this.state.fields.map((f, index) => {
        return this.renderForm(this.props.dataSource, f, index);
      });
    }
  }

  render() {
    const tailFormItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 1,
      },
    };
    return (
      <div>
        <Form horizontal={true} >
          <FormItem {...tailFormItemLayout}>
            {this._renderColumnAction(BUTTON_POSITION.TOP)}
          </FormItem>
          {this.renderBody()}
          <FormItem {...tailFormItemLayout}>
            {this._renderColumnAction(BUTTON_POSITION.BOTTOM)}
          </FormItem>
        </Form>
      </div>
    );
  }
}

const detailCreator = () => {
  return Form.create()(Detail);
}

export default detailCreator;


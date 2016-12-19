/**
 * Created by xgwen on 16/12/2.
 */
/* eslint-disable */
import React from 'react';
import {Form, Input, Radio, Select, Row, Button, Modal} from 'mxa';
import Validation from '../../utils/validation';

import styles from './../../styles/views/approve.less';

const FormItem = Form.Item;

class ApprovalForm extends React.Component {

  static PropTypes = {
    dataSource: React.PropTypes.any,
  };

  static defaultProps = {
    dataSource: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      handleCommentIsRequire: false,
      showRejectOneFormItem: false,
      showRejectAnyFormItem: false,
      fileVisible: false,
      commitVisible: false,
    };
  }

  showSelectFileModal = () => {
    this.setState({
      fileVisible: true,
    });
  };

  showCommitModal = () => {
    this.setState({
      commitVisible: true,
    });
  };

  handleSelectFileCancel = (e) => {
    console.log(e);
    this.setState({
      fileVisible: false,
    });
  };

  handleCommitCancel = (e) => {
    console.log(e);
    this.setState({
      commitVisible: false,
    });
  };

  handleResultChange = (e) => {
    switch (e.target.value) {
      case '退回上一步':
      {
        this.setState({
          handleCommentIsRequire: true,
          showRejectOneFormItem: true,
          showRejectAnyFormItem: false
        });
        break;
      }
      case '否决':
      {
        this.setState({
          handleCommentIsRequire: true,
          showRejectOneFormItem: false,
          showRejectAnyFormItem: false
        });
        break;
      }
      case '退回到任意阶段':
      {
        this.setState({
          handleCommentIsRequire: true,
          showRejectOneFormItem: false,
          showRejectAnyFormItem: true
        });
        break;
      }
      default:
      {
        this.setState({
          handleCommentIsRequire: false,
          showRejectOneFormItem: false,
          showRejectAnyFormItem: false
        });
      }
    }
  };

  flowTypeChange = (e) => {
    console.log(e.target);
  };

  renderRadioItem = (dataSource) => {
    return dataSource.map(item => {
      return <Radio key={item.key} value={item.value}>{item.value}</Radio>
    })
  };

  renderSelectItem = (dataSource) => {
    return dataSource.map(item => {
      return <Select.Option key={item.key} value={item.value}>{item.value}</Select.Option>
    })
  };

  renderHandleResultFormItem = (getFieldDecorator, formItemLayout) => {
    if (this.props.dataSource.isFinalApprove) {
      return (
        <FormItem {...formItemLayout} label="意见选择" type="flex" justify="space-between" align="middle">
          {getFieldDecorator('handleResult', {
            initialValue: this.props.dataSource.handleResultData.finalHandleResult[0].value,
            rules: [{
              required: true,
            }],
          })(<Radio.Group onChange={this.handleResultChange}>
            {this.renderRadioItem(this.props.dataSource.handleResultData.finalHandleResult)}
          </Radio.Group>)}
        </FormItem>
      );
    }
    return (
      <FormItem {...formItemLayout} label="意见选择" type="flex" justify="space-between" align="middle">
        {getFieldDecorator('handleResult', {
          initialValue: this.props.dataSource.handleResultData.normalHandleResult[0].value,
          rules: [{
            required: true,
          }],
        })(<Radio.Group onChange={this.handleResultChange}>
          {this.renderRadioItem(this.props.dataSource.handleResultData.normalHandleResult)}
        </Radio.Group>)}
      </FormItem>
    );
  };

  renderRejectAnyFormItem = (getFieldDecorator, formItemLayout) => {
    if (this.state.showRejectAnyFormItem) {
      return (
        <div>
          <FormItem {...formItemLayout} label="退回用户名称" type="flex" justify="space-between" align="middle">
            {getFieldDecorator('rejectToLastStep', {
              rules: [{
                required: true,
              }],
            })(<Select placeholder="选择用户名称">
              {this.renderSelectItem(this.props.dataSource.rejectToLastStepData)}
            </Select>)}
          </FormItem>
          <FormItem {...formItemLayout} label="指定提交方式" type="flex" justify="space-between" align="middle">
            {getFieldDecorator('flowType', {
              initialValue: this.props.dataSource.flowTypeData[0].value,
              rules: [{
                required: true,
              }],
            })(<Radio.Group onChange={this.flowTypeChange}>
              {this.renderRadioItem(this.props.dataSource.flowTypeData)}
            </Radio.Group>)}
          </FormItem>
        </div>
      );
    }
    return null;
  };

  renderRejectOneFormItem = (getFieldDecorator, formItemLayout) => {
    if (this.state.showRejectOneFormItem) {
      return (
        <FormItem {...formItemLayout} label="指定上一步审批人" type="flex" justify="space-between" align="middle">
          {getFieldDecorator('rejectToActivity', {
            rules: [{
              required: true,
            }],
          })(<Select placeholder="选择审批人">
            {this.renderSelectItem(this.props.dataSource.rejectToActivityData)}
          </Select>)}
        </FormItem>
      );
    }
    return null;
  };

  validationMobile = (rule, value, callback, source, options) => {
    const isMobile = Validation.isMobile(value);
    if (!isMobile) {
      callback('请输入正确的手机号码!!!');
    }
  };

  render() {
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 16},
    };

    const { visible, onCancel, title } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form horizontal={true} className={styles.approvalForm}>
        {this.renderHandleResultFormItem(getFieldDecorator, formItemLayout)}
        {this.renderRejectOneFormItem(getFieldDecorator, formItemLayout)}
        {this.renderRejectAnyFormItem(getFieldDecorator, formItemLayout)}
        <FormItem {...formItemLayout} label="意见详情" type="flex" justify="space-between" align="middle">
          {getFieldDecorator('handleComment', {
            initialValue: '意见详情',
            rules: [{
              required: this.state.handleCommentIsRequire,
            },{
              validator: this.validationMobile
            }],
          })(<Input type="textarea" rows={4}/>)}
        </FormItem>
        <Row type="flex" justify="center" align="middle">
          <Button className={styles.formButton} onClick={() => this.save()} type="primary">保存</Button>
          <Button className={styles.formButton} onClick={this.showCommitModal} type="primary">提交</Button>
          <Modal
            title="选择下一步审批人"
            visible={this.state.commitVisible}
            onCancel={this.handleCommitCancel}
            footer={[]}
          >
            <p>我不叫赵山河</p>
            <p>我不叫赵山河</p>
            <p>我不叫赵山河</p>
          </Modal>
          <Button className={styles.formButton} onClick={this.showSelectFileModal} type="primary">意见附件</Button>
          <Modal
            title="选择意见附件"
            visible={this.state.fileVisible}
            onCancel={this.handleSelectFileCancel}
            footer={[]}
          >
            <p>文件aaa</p>
            <p>文件aaa</p>
            <p>文件aaa</p>
          </Modal>
          <Button className={styles.formButton} type="primary" onClick={onCancel} >返回</Button>
        </Row>
      </Form>
    );
  }
}

const WrappedApprovalForm = Form.create()(ApprovalForm);

export default WrappedApprovalForm;

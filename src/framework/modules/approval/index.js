/**
 * Created by xgwen on 16/11/30.
 */
/* eslint-disable */
import React from 'react';
import { autobind } from 'core-decorators';
import { Button, Row, Affix } from 'mxa';
import { connect } from 'react-redux';
import ApproveForm from './approveForm';

import styles from './../../styles/views/approval.less';

const approve = {
  isFinalApprove: false, // true 最后一个  false 不是流程最后一步
  handleResultData: {
    normalHandleResult: [
      {key: 'agree', value: '同意'},
      {key: 'rejectToLastStep', value: '退回上一步'},
      {key: 'rejectToAnyStep', value: '退回到任意阶段'}
    ],
    finalHandleResult: [
      {key: 'agree', value: '批准'},
      {key: 'disAgree', value: '否决'},
      {key: 'rejectToLastStep', value: '退回上一步'},
      {key: 'rejectToAnyStep', value: '退回到任意阶段'}
    ]
  },
  flowTypeData: [
    {key: '顺序提交', value: '顺序提交'},
    {key: '提交到当前阶段', value: '提交到当前阶段'},
  ],
  rejectToLastStepData: [
    {key: '1', value: '我不是赵山河1'},
    {key: '2', value: '我不是赵山河2'},
    {key: '3', value: '我不是赵山河3'},
  ],
  rejectToActivityData: [
    {key: '1', value: '我不是赵山河1'},
    {key: '2', value: '我不是赵山河2'},
    {key: '3', value: '我不是赵山河3'},
  ]
};

export default class Approval extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
  }

  @autobind
  showModal() {
    this.setState({
      visible: true,
    });
    // window.open('/check');
  }


  @autobind
  renderAffixView() {
    return (
      <ApproveForm
        visible={this.state.visible}
        onCancel={this.handleCancel}
        title="项目审批"
        dataSource={approve}
        {...this.props}
      />
    );
  }

  render() {
    return (
      <div style={{padding: '1rem'}}>
        {this.renderAffixView()}
      </div>
    );
  }
}

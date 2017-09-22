/* eslint-disable no-console */

import React, { PropTypes } from 'react';
import { push } from 'react-router-redux';
import { autobind } from 'core-decorators';
import { Button, Modal, Tooltip } from 'antd';
import Qs from 'qs';
import { trimStart } from 'lodash/string';
import { CONTAINER_PRE } from '../../framework/routes';
import { showModal } from '../../framework/pageContainer/ModalWrapper';
import { PFetch } from '../../framework/system/fetch';
import { longRunExec } from '../../framework/system/longRunOpt';

import actionProcess from './actionProcess';

import {
  LIST_SELECTTYPE,
  BUTTON_INTERACTIVETYPE,
  BUTTON_MESSAGEPROMPTTYPE,
  BUTTON_RELATEDDATA,
  BUTTON_BINDPARAMETERTYPE,
  BUTTON_ACTIONTYPE
} from '../../framework/constant/dictCodes';

const confirm = Modal.confirm;

export class ExtendButton extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    // record: PropTypes.any,
    // mainEntityKey: PropTypes.string,
    type: PropTypes.oneOf(['button', 'link']),
    // selectedType: PropTypes.oneOf([LIST_SELECTTYPE.INLINE, LIST_SELECTTYPE.RADIO, LIST_SELECTTYPE.CHECKBOX]),
    // inline: PropTypes.bool,
    // query: PropTypes.object,
    // inject: PropTypes.object,
    // submitFuc: PropTypes.object,
    // relatedData: PropTypes.string,
    buttonDescriptionDetail: PropTypes.string,
  };

  static defaultProps = {
    selectedType: LIST_SELECTTYPE.INLINE,
    inline: true,
    relatedData: BUTTON_RELATEDDATA.NONE
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  @autobind
  switchLoading(flag) {
    this.setState({ loading: flag });
  }

  // 第一阶段  收集数据
  @autobind
  _triggerAction() {
    if (!this.state.loading) {
      actionProcess(this.props, this.switchLoading);
      // this.setState({ loading: true }, () => actionProcess(this.props, this.stopLoading));
    }
  }

  @autobind
  _renderButton() {
    if (this.props.type === 'button') {
      return (
        <Button
          {...this.props.buttonProps}
          className={this.props.className}
          onClick={this._triggerAction}
          disabled={this.props.disabled}
          loading={this.state.loading}
        >{this.props.buttonDescription}</Button>
      );
    }

    return (
      <a
        className={this.props.className}
        onClick={this._triggerAction}
      >{this.props.buttonDescription}</a>
    );
  }

  render() {
    if (this.props.buttonDescriptionDetail) {
      return (
        <Tooltip title={this.props.buttonDescriptionDetail}>
          {this._renderButton()}
        </Tooltip>
      );
    }
    return this._renderButton();
  }
}

export default ExtendButton;

/* eslint-disable no-console */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { autobind } from 'core-decorators';
import { Button, Modal, Tooltip } from 'mxa';
import Qs from 'qs';
import { CONTAINER_PRE } from '../../routes';
import { showModal } from '../pageContainer/ModalWrapper';
import { PFetch } from '../../system/fetch';

const confirm = Modal.confirm;

export class ExtendButton extends React.Component {
  static propTypes = {
    record: React.PropTypes.object,
    type: React.PropTypes.oneOf(['button', 'link']),
  };

  @autobind
  _jump(domainLink, params, domainType, mode) {
    if (mode === 'Page') {
      window.open('/' + CONTAINER_PRE + domainLink + '?' + Qs.stringify({ ...params, domainType }));
    } else if (mode === 'Modal') {
      showModal(params, domainType, domainLink);
    } else {
      this.props.dispatch(push({
        pathname: '/' + CONTAINER_PRE + domainLink,
        query: { ...params, domainType }
      }));
    }
  }

  @autobind
  _processAction(url, params) {
    PFetch(url, params)
      .then(response => {
        console.log(response);
        if (this.props.messagePromptType === 'message') {
          Modal.info({
            title: '提示',
            content: (<div>您已成功{this.props.buttonDescription}{this.props.record.realName}！</div>),
            onOk() {},
          });
        }
      })
      .catch(errorData => {
        console.log(errorData);
        Modal.error({
          title: '提示',
          content: (<div>{this.props.buttonDescription}{this.props.record.realName}失败！</div>),
          onOk() {},
        });
      });
  }


  @autobind
  _triggerAction() {
    if (this.props.interactiveType === 'Action') {
      // message|confirm|tooltip
      if (this.props.messagePromptType === 'confirm') {
        confirm({
          title: '提示',
          content: (<div>确认{this.props.buttonDescription}{this.props.record.realName}吗？</div>),
          onOk: () => {
            this._processAction(this.props.actionName, { id: this.props.record.id });
          },
          onCancel() {},
        });
      } else {
        this._processAction(this.props.actionName, { id: this.props.record.id });
      }
    } else {
      // eslint-disable-next-line max-len
      this._jump(this.props.domainLink, { id: this.props.record.id }, this.props.domainType, this.props.interactiveType);
    }
  }

  @autobind
  _renderButton() {
    if (this.props.type === 'button') {
      return (
        <Button
          {...this.props.buttonProps}
          className={this.props.className}
          onClick={() => this._triggerAction()}
        >{this.props.buttonDescription}</Button>
      );
    }

    return (
      <a
        className={this.props.className}
        onClick={() => this._triggerAction()}
      >{this.props.buttonDescription}</a>
    );
  }

  render() {
    if (this.props.messagePromptType === 'confirm') {
      return (
        <Tooltip title={this.props.buttonDescription + this.props.record.realName}>
          {this._renderButton()}
        </Tooltip>
      );
    }

    return this._renderButton();
  }
}

export default connect()(ExtendButton);

/* eslint-disable no-console */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { autobind } from 'core-decorators';
import { Button, Modal, Tooltip } from 'mxa';
import Qs from 'qs';
import { CONTAINER_PRE } from '../../framework/routes';
import { showModal } from '../../framework/pageContainer/ModalWrapper';
import { PFetch } from '../../framework/system/fetch';

const confirm = Modal.confirm;

export class ExtendButton extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    record: PropTypes.object,
    type: PropTypes.oneOf(['button', 'link']),
    selectedType: PropTypes.oneOf(['inline', 'radio', 'checkbox']),
  };

  static defaultProps = {
    selectedType: 'inline'
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
            content: (<div>您已成功{this.props.buttonDescription}{this.props.record && this.props.record.realName}！</div>),
            onOk() {},
          });
        }
      })
      .catch(errorData => {
        console.log(errorData);
        Modal.error({
          title: '提示',
          content: (<div>{this.props.buttonDescription}{this.props.record && this.props.record.realName}失败！</div>),
          onOk() {},
        });
      });
  }

  @autobind
  _triggerAction() {
    let activeData = this.props.record;
    if (this.props.selectedType === 'radio') {
      activeData = this.props.record[0];
    }
    if (this.props.interactiveType === 'Action') {
      let params;
      if (this.props.selectedType === 'checkbox') {
        params = this.props.record.map(item => item.id);
      } else {
        params = { id: activeData.id };
      }
      // message|confirm|tooltip
      if (this.props.selectedType !== 'checkbox' && this.props.messagePromptType === 'confirm') {
        confirm({
          title: '提示',
          content: (<div>确认{this.props.buttonDescription}{activeData.realName}吗？</div>),
          onOk: () => {
            this._processAction(this.props.actionName, params);
          },
          onCancel() {},
        });
      } else {
        this._processAction(this.props.actionName, params);
      }
    } else {
      // eslint-disable-next-line max-len
      this._jump(this.props.domainLink, { id: activeData.id }, this.props.domainType, this.props.interactiveType);
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
          disabled={this.props.disabled}
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

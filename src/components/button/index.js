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

import { LIST_SELECTTYPE, BUTTON_INTERACTIVETYPE, BUTTON_MESSAGEPROMPTTYPE } from '../../framework/constant/dictCodes';

const confirm = Modal.confirm;

export class ExtendButton extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    record: PropTypes.any,
    type: PropTypes.oneOf(['button', 'link']),
    selectedType: PropTypes.oneOf([LIST_SELECTTYPE.INLINE, LIST_SELECTTYPE.RADIO, LIST_SELECTTYPE.CHECKBOX]),
  };

  static defaultProps = {
    selectedType: LIST_SELECTTYPE.INLINE
  };

  @autobind
  _jump(domainLink, params, domainType, mode) {
    if (mode === BUTTON_INTERACTIVETYPE.PAGE) {
      window.open('/' + CONTAINER_PRE + domainLink + '?' + Qs.stringify({ ...params, domainType, s: '1' }));
    } else if (mode === BUTTON_INTERACTIVETYPE.MODAL) {
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
        if (this.props.messagePromptType === BUTTON_MESSAGEPROMPTTYPE.MESSAGE) {
          Modal.info({
            title: '提示',
            content: (<div>{this.props.buttonDescription}成功！</div>),
            onOk() {},
          });
        }
      })
      .catch(errorData => {
        console.log(errorData);
        Modal.error({
          title: '提示',
          content: (<div>{this.props.buttonDescription}失败！</div>),
          onOk() {},
        });
      });
  }

  @autobind
  _triggerAction() {
    let activeData = this.props.record;
    if (this.props.selectedType === LIST_SELECTTYPE.RADIO) {
      activeData = this.props.record[0];
    }
    if (this.props.interactiveType === BUTTON_INTERACTIVETYPE.ACTION) {
      let params;
      if (this.props.selectedType === LIST_SELECTTYPE.CHECKBOX) {
        params = this.props.record.map(item => item.id);
      } else {
        params = { id: activeData.id };
      }
      // message|confirm|tooltip
      if (this.props.selectedType !== LIST_SELECTTYPE.CHECKBOX
        && this.props.messagePromptType === BUTTON_MESSAGEPROMPTTYPE.CONFIRM) {
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
    if (this.props.messagePromptType === BUTTON_MESSAGEPROMPTTYPE.TOOLTIP) {
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

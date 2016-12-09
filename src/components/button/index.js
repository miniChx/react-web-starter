/* eslint-disable no-console */

import React, { PropTypes } from 'react';
import { push } from 'react-router-redux';
import { autobind } from 'core-decorators';
import { Button, Modal, Tooltip } from 'mxa';
import Qs from 'qs';
import { CONTAINER_PRE } from '../../framework/routes';
import { showModal } from '../../framework/pageContainer/ModalWrapper';
import { PFetch } from '../../framework/system/fetch';

import {
  LIST_SELECTTYPE,
  BUTTON_INTERACTIVETYPE,
  BUTTON_MESSAGEPROMPTTYPE,
  BUTTON_RELATEDROWS,
  BUTTON_BINDPARAMETERTYPE,
} from '../../framework/constant/dictCodes';

const confirm = Modal.confirm;

export class ExtendButton extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    record: PropTypes.any,
    mainEntityKey: PropTypes.string,
    type: PropTypes.oneOf(['button', 'link']),
    selectedType: PropTypes.oneOf([LIST_SELECTTYPE.INLINE, LIST_SELECTTYPE.RADIO, LIST_SELECTTYPE.CHECKBOX]),
    inline: PropTypes.bool,
    query: PropTypes.object,
    inject: PropTypes.object,
  };

  static defaultProps = {
    selectedType: LIST_SELECTTYPE.INLINE,
    inline: true,
  };

  @autobind
  _jump(domainLink, params, domainType, mode) {
    if (mode === BUTTON_INTERACTIVETYPE.PAGE) {
      // window.open('/' + CONTAINER_PRE + domainLink + '?' + Qs.stringify({
      //   p: btoa(search)
      // }));
      window.open('/' + CONTAINER_PRE + domainLink + '?p=' + btoa(Qs.stringify({ ...params, domainType, s: '1' })));
    } else if (mode === BUTTON_INTERACTIVETYPE.MODAL) {
      showModal(params, domainType, domainLink, () => this.props.onRefresh && this.props.onRefresh());
    } else {
      this.props.dispatch(push({
        pathname: '/' + CONTAINER_PRE + domainLink,
        query: { p: btoa(Qs.stringify({ ...params, domainType })) }
      }));
    }
  }

  @autobind
  _processAction(url, params) {
    PFetch(url, params)
      .then(response => {
        console.log(response);
        Modal.info({
          title: '提示',
          content: (<div>{this.props.buttonDescription}成功！</div>),
          onOk: () => this.props.onRefresh && this.props.onRefresh(),
        });
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
  _genParams(record) {
    const params = { [this.props.mainEntityKey]: record[this.props.mainEntityKey], ...this.props.query };
    if (this.props.bindParameterType === BUTTON_BINDPARAMETERTYPE.SEVERAL) {
      this.props.bindParameters.forEach(item => {
        params[item.name] = item.value || this.props.query[item.value];
      });
    }

    if (this.props.transmitParameters && this.props.transmitParameters.length > 0) {
      this.props.transmitParameters.forEach(item => {
        params[item.name] = record[item.name];
      });
    }
    return params;
  }

  @autobind
  _triggerActionWithoutRows() {
    const params = this.props.query || {};
    if (this.props.interactiveType === BUTTON_INTERACTIVETYPE.ACTION) {
      // message|confirm|tooltip
      if (this.props.messagePromptType === BUTTON_MESSAGEPROMPTTYPE.CONFIRM) {
        confirm({
          title: '提示',
          content: (<div>确认{this.props.buttonDescription}吗？</div>),
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
      this._jump(this.props.domainLink, { ...params }, this.props.domainType, this.props.interactiveType);
    }
  }

  @autobind
  _triggerActionSingle(activeData) {
    const params = this._genParams(activeData);
    if (this.props.interactiveType === BUTTON_INTERACTIVETYPE.ACTION) {
      // message|confirm|tooltip
      if (this.props.messagePromptType === BUTTON_MESSAGEPROMPTTYPE.CONFIRM) {
        confirm({
          title: '提示',
          content: (<div>确认{this.props.buttonDescription}{activeData.leaseeName}吗？</div>),
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
      this._jump(this.props.domainLink, { ...params }, this.props.domainType, this.props.interactiveType);
    }
  }

  @autobind
  _triggerActionMultiple(activeData) {
    // Interactive type can only be 'ACTION'
    if (this.props.interactiveType === BUTTON_INTERACTIVETYPE.ACTION) {
      const params = activeData.map(record => this._genParams(record));

      // message|confirm|tooltip
      if (this.props.messagePromptType === BUTTON_MESSAGEPROMPTTYPE.CONFIRM) {
        confirm({
          title: '提示',
          content: (<div>确认{this.props.buttonDescription}所选数据吗？</div>),
          onOk: () => {
            this._processAction(this.props.actionName, { keys: params });
          },
          onCancel() {},
        });
      } else {
        this._processAction(this.props.actionName, { keys: params });
      }
    }
  }

  @autobind
  _triggerAction() {
    const { record, buttonDescription, inject } = this.props;

    if (this.props.bindParameterType === BUTTON_BINDPARAMETERTYPE.CUSTOMIZE) {
      if (inject.buttons && inject.buttons.length > 0) {
        const injectAction = inject.buttons.filter(button => button.key === buttonDescription);
        if (injectAction && injectAction.length > 0) {
          injectAction[0].action && injectAction[0].action({ props: this.props, record });
        }
      }
    } else if (this.props.relatedRows === BUTTON_RELATEDROWS.NONE) {
      this._triggerActionWithoutRows();
    } else if (this.props.inline) {
      this._triggerActionSingle(record);
    } else if (this.props.selectedType !== LIST_SELECTTYPE.CHECKBOX
      || this.props.relatedRows === BUTTON_RELATEDROWS.SINGLE) {
      this._triggerActionSingle(record[0]);
    } else {
      this._triggerActionMultiple(record);
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
    // TODO. temporary disabled tooltip
    // if (this.props.messagePromptType === BUTTON_MESSAGEPROMPTTYPE.TOOLTIP) {
    //   return (
    //     <Tooltip title={this.props.buttonDescription}>
    //       {this._renderButton()}
    //     </Tooltip>
    //   );
    // }

    return this._renderButton();
  }
}

export default ExtendButton;

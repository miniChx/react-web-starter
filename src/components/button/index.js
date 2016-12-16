/* eslint-disable no-console */

import React, { PropTypes } from 'react';
import { push } from 'react-router-redux';
import { autobind } from 'core-decorators';
import { Button, Modal, Tooltip } from 'mxa';
import Qs from 'qs';
import { trimStart } from 'lodash/string';
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
    submitFuc: PropTypes.object
  };

  static defaultProps = {
    selectedType: LIST_SELECTTYPE.INLINE,
    inline: true,
  };

  @autobind
  _getActionLink() {
    return this.props.actionLink || this.props.actionName || this.props.domainLink;
  }

  @autobind
  _jump(params) {
    const templateType = this.props.templateType || this.props.domainType;
    const actionLink = this._getActionLink();
    const mode = this.props.interactiveType;
    if (mode === BUTTON_INTERACTIVETYPE.PAGE) {
      // window.open('/' + CONTAINER_PRE + domainLink + '?' + Qs.stringify({
      //   p: btoa(search)
      // }));
      window.open('/' + CONTAINER_PRE + actionLink + '?p=' + btoa(Qs.stringify({ ...params, templateType, s: '1' })));
    } else if (mode === BUTTON_INTERACTIVETYPE.MODAL) {
      showModal(params, templateType, actionLink, () => this.props.onRefresh && this.props.onRefresh());
    } else {
      this.props.dispatch(push({
        pathname: '/' + CONTAINER_PRE + actionLink,
        query: { p: btoa(Qs.stringify({ ...params, templateType })) }
      }));
    }
  }

  @autobind
  _processNext(params) { // eslint-disable-line no-unused-vars
    if (this.props.nextActionLink) {
      // TODO. process next stage
    } else {
      this.props.onRefresh && this.props.onRefresh();
    }
  }

  @autobind
  _processAction(params) {
    if (this.props.submitFuc) {
      this.props.submitFuc();
    } else {
      const url = this._getActionLink();
      PFetch(trimStart(url, '/'), params)
        .then(response => {
          console.log(response);
          Modal.info({
            title: '提示',
            content: (<div>{this.props.buttonDescription}成功！</div>),
            onOk: () => this._processNext(params),
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
  }

  @autobind
  _genCustomParams() {
    const { record, buttonDescription, inject } = this.props;
    let customParams = {};
    if (this.props.bindParameterType === BUTTON_BINDPARAMETERTYPE.CUSTOMIZE) {
      if (inject.buttons && inject.buttons.length > 0) {
        const injectAction = inject.buttons.filter(button => button.key === buttonDescription);
        if (injectAction && injectAction.length > 0 && injectAction[0].action) {
          customParams = injectAction[0].action({ props: this.props, record });
        }
      }
    }
    return customParams;
  }

  @autobind
  _genParams(record) {
    const params = {
      [this.props.mainEntityKey]: record[this.props.mainEntityKey],
      ...this.props.query,
      ...this._genCustomParams(),
    };
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
    const params = { ...this.props.query, ...this._genCustomParams() };
    if (this.props.interactiveType === BUTTON_INTERACTIVETYPE.ACTION) {
      // message|confirm|tooltip
      if (this.props.messagePromptType === BUTTON_MESSAGEPROMPTTYPE.CONFIRM) {
        confirm({
          title: '提示',
          content: (<div>确认{this.props.buttonDescription}吗？</div>),
          onOk: () => {
            this._processAction(params);
          },
          onCancel() {},
        });
      } else {
        this._processAction(params);
      }
    } else {
      // eslint-disable-next-line max-len
      this._jump(params);
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
            this._processAction(params);
          },
          onCancel() {},
        });
      } else {
        this._processAction(params);
      }
    } else {
      // eslint-disable-next-line max-len
      this._jump(params);
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
            this._processAction({ keys: params });
          },
          onCancel() {},
        });
      } else {
        this._processAction({ keys: params });
      }
    }
  }

  @autobind
  _triggerAction() {
    const { record } = this.props;
    if (this.props.relatedRows === BUTTON_RELATEDROWS.NONE) {
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

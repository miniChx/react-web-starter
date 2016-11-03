/* eslint-disable no-console */

import React from 'react';
import { routerShape } from 'react-router';
import { autobind } from 'core-decorators';
import { Button, Modal } from 'mxa';
import Qs from 'qs';

import { CONTAINER_PRE } from '../../router';
import { showModal } from '../pageContainer/ModalWrapper';

class ExtendButton extends React.Component {
  static contextTypes = {
    router: routerShape,
  };

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
      this.context.router.push({
        pathname: '/' + CONTAINER_PRE + domainLink,
        query: { ...params, domainType }
      });
    }
  }

  @autobind
  _triggerAction() {
    if (this.props.interactiveType === 'Action') {
      // if ()
      // TODO. Deal with action
      Modal.info({
        title: '提示',
        content: (
          <div>确认{this.props.buttonDescription}{this.props.record.realName}吗？</div>
        ),
        onOk() {},
      });
    } else {
      // eslint-disable-next-line max-len
      this._jump(this.props.domainLink, { id: this.props.record.id }, this.props.domainType, this.props.interactiveType);
    }
  }

  render() {
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
}

export default ExtendButton;


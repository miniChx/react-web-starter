/**
 * Created by baoyinghai on 12/23/16.
 */
import React, { PropTypes } from 'react';
import { Button, Modal, Tooltip } from 'mxa';
import { trimStart } from 'lodash/string';

import { PFetch } from '../../../framework/system/fetch';
import { longRunExec } from '../../../framework/system/longRunOpt';
import popConfirm from './popConfirm';
import lastAction from './lastAction';

const processAction = (data, props, next) => {
  longRunExec(() => PFetch(trimStart(data.url, '/'), data.params)
    .then(response => {
      next && next({ ...response, needConfirm: true });
    })
    .catch(errorData => {
      console.log(errorData);
      Modal.error({
        title: '提示',
        content: (<div>{props.buttonDescription}失败！</div>),
        onOk() {},
      });
    }));
};

const nextLinkDecorator = () => {
  return {
    next: (data, props, next) => {
      processAction({ params: data, url: props.actionLink }, props, next);
    },
    ctrl: (data, props, process) => {
      process.push({
        next: (d, p, next) => {
          lastAction.next(d, p.nextActionLink, p);
        }
      });
    }
  };
};

const lastActionDecorator = () => {
  return {
    next: (data, props, next) => {
      lastAction.next(data, props.actionLink, props);
    }
  };
};

export default {
  next: processAction,
  ctrl: (data, props, processCtrl) => {
    if (data.needConfirm) {
      if (props.nextActionLink) {
        processCtrl.push(nextLinkDecorator());
      }
      processCtrl.push(popConfirm);
    } else if (props.nextActionLink) {
      processCtrl.push(nextLinkDecorator());
    } else {
      processCtrl.push(lastActionDecorator());
    }
  }
};

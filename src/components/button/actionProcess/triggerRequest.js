/**
 * Created by baoyinghai on 12/23/16.
 */
import React, { PropTypes } from 'react';
import { Button, Modal, Tooltip } from 'mxa';
import { trimStart } from 'lodash/string';

import { PFetch } from '../../../framework/system/fetch';
import { longRunExec } from '../../../framework/system/longRunOpt';
import routerChange from './routerChange';

const processAction = (data, props, next) => {
  longRunExec(() => PFetch(trimStart(data.url, '/'), data.params)
    .then(response => {
      // TODO: response field override data.params
      if (response.needConfirm) {
        Modal.confirm({
          title: '提示',
          content: (<div>{data.msgContent}?</div>),
          onOk: () => next({ ...data.params, needConfirm: true }),
        });
      } else {
        // 主要有nextLink的情况
        next && next({ ...data.params, ...response });
      }
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
      processAction({ params: data, url: props.actionLink || props.domainLink }, props, next);
    },
    ctrl: (data, props, process) => {
      process.push({
        next: (d, p, next) => {
          routerChange.next(d, p.nextActionLink, p);
        }
      });
    }
  };
};

const routerChangeDecorator = () => {
  return {
    next: (data, props, next) => {
      routerChange.next(data, props.actionLink || props.domainLink, props);
    }
  };
};

export default {
  next: processAction,
  ctrl: (data, props, processCtrl) => {
    if (props.nextActionLink) {
      processCtrl.push(nextLinkDecorator());
    } else {
      processCtrl.push(routerChangeDecorator());
    }
  }
};

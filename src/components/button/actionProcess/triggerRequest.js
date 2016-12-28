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
      if (response.needConfirm) {
        Modal.confirm({
          title: '提示',
          content: (<div>{response.msgContent}?</div>),
          onOk: () => {
            longRunExec(() => PFetch(trimStart(data.url, '/'), { ...data.params, needConfirm: true })
              .then(r => next({ ...data.params, ...r })));
          },
        });
      } else {
        // 主要有nextLink的情况
        Modal.info({
          title: '提示',
          content: (<div>{props.buttonDescription}成功！</div>),
          onOk: () => next && next({ ...data.params, ...response })
        });
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

const routerChangeDecorator = url => {
  return {
    next: (data, props, next) => {
      routerChange.next(data, url, props, next);
    }
  };
};

export default {
  next: processAction,
  ctrl: (data, props, processCtrl) => {
    if (props.nextActionLink) {
      processCtrl.push(routerChangeDecorator(props.nextActionLink));
    } else {
      processCtrl.push(routerChangeDecorator(props.actionLink || props.domainLink));
    }
  }
};

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


export default {
  next: processAction,
  ctrl: (data, props, processCtrl) => {
    if (data.needConfirm) {
      if (props.nextActionLink) {
        processCtrl.push({
          next: (d, p, next) => {
            processAction({ params: d, url: props.actionLink }, p, next);
          },
          ctrl: (d, p, process) => {
            process.push(lastAction);
          }
        });
      }
      processCtrl.push(popConfirm);
    } else if (props.nextActionLink) {
      processCtrl.push({
        next: (d, p, next) => {
          processAction({ params: d, url: props.actionLink }, p, next);
        },
        ctrl: (d, p, process) => {
          process.push(lastAction);
        }
      });
    } else {
      processCtrl.push(lastAction);
    }
  }
};

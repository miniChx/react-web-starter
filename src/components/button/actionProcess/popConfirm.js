/**
 * 二次确认框
 */
import React, { PropTypes } from 'react';
import { Modal } from 'mxa';

const confirmData = (data, props, next) => {
  if (data.needConfirm) {
    Modal.confirm({
      title: '提示',
      content: (<div>{props.buttonDescription}二次确认！</div>),
      onOk: () => next(data),
    });
  } else {
    next(data);
  }
};

export default {
  next: confirmData
};

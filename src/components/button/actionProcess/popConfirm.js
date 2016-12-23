/**
 * 二次确认框
 */
import React, { PropTypes } from 'react';
import { Modal } from 'mxa';

const confirmData = (data, props, next) => {
  if (data.needConfrim) {
    Modal.error({
      title: '提示',
      content: (<div>{props.buttonDescription}失败！</div>),
      onOk: () => next(data),
    });
  } else {
    next(data);
  }
};

export default {
  next: confirmData
};

/**
 * Created by vison on 11/17/16.
 */
import React from 'react';
import { InputNumber } from 'antd';

const compRender = record => {
  return (
    <InputNumber disabled={record.isReadonly} />
  );
};

export default compRender;

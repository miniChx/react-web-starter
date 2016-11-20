/**
 * Created by baoyinghai on 11/17/16.
 */
import React from 'react';
import { InputNumber } from 'mxa';

const compRender = record => {
  return (
    <InputNumber disabled={record.isReadonly} />
  );
};

export default compRender;

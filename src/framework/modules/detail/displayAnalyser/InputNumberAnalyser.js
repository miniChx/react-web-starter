/**
 * Created by baoyinghai on 11/17/16.
 */
import React from 'react';
import { InputNumber } from 'mxa';

const compRender = (record, model) => {
  return (
    <InputNumber disabled={record.isReadonly || model === 'show'} />
  );
};

export default compRender;

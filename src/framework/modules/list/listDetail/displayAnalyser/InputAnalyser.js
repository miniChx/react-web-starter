/**
 * Created by baoyinghai on 11/17/16.
 */
import React from 'react';
import { Input } from 'mxa';

const compRender = (record, model) => {
  return (
    <Input disabled={record.isReadonly || model === 'show'} />
  );
};

export default compRender;

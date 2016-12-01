/**
 * Created by baoyinghai on 11/20/16.
 */
import React from 'react';
import { Radio } from 'mxa';

const compRender = (record, model) => {
  return (
    <Radio disabled={record.isReadonly || model === 'show'} />
  );
};

export default compRender;

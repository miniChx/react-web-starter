/**
 * Created by baoyinghai on 11/20/16.
 */
import React from 'react';
import { Radio } from 'mxa';

const compRender = record => {
  return (
    <Radio disabled={record.isReadonly} />
  );
};

export default compRender;

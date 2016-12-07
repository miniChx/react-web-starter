/**
 * Created by baoyinghai on 11/20/16.
 */
import React from 'react';
import { Radio } from 'mxa';
import staticDisplay from './StaticDisplay';

const compRender = record => {
  return (
    <Radio disabled={record.isReadonly} />
  );
};

export default {
  show: staticDisplay,
  edit: compRender
};

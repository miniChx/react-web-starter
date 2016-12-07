/**
 * Created by baoyinghai on 11/17/16.
 */
import React from 'react';
import { Input } from 'mxa';
import staticDisplay from './StaticDisplay';

const compRender = record => {
  return (
    <Input disabled={record.isReadonly} />
  );
};

export default {
  show: staticDisplay,
  edit: compRender
};

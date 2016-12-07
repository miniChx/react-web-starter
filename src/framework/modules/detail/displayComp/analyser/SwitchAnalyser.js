/**
 * Created by baoyinghai on 11/17/16.
 */
import React from 'react';
import { Switch } from 'mxa';
import staticDisplay from './StaticDisplay';

const compRender = record => {
  return (
    <Switch disabled={record.isReadonly} />
  );
};

export default {
  show: staticDisplay,
  edit: compRender
};

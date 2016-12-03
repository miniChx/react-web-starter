/**
 * Created by baoyinghai on 11/17/16.
 */
import React from 'react';
import { Checkbox } from 'mxa';
import StaticDisplay from './StaticDisplay';

const compRender = record => {
  return (
    <Checkbox disabled={record.isReadonly} />
  );
};

export default {
  show: StaticDisplay,
  edit: compRender
};

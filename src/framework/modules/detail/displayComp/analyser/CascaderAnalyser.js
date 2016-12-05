/**
 * Created by baoyinghai on 11/20/16.
 */

import React from 'react';
import { Cascader } from 'mxa';
import StaticDisplay from './StaticDisplay';

const compRender = record => {
  return (
    <Cascader options={record.displayComponent.items} placeholder="请选择" disabled={record.isReadonly} />
  );
};

export default {
  show: StaticDisplay,
  edit: compRender
};

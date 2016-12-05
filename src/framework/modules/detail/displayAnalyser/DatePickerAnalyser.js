/**
 * Created by baoyinghai on 11/17/16.
 */
import React from 'react';
import { DatePicker } from 'mxa';
import StaticDisplay from './StaticDisplay';

const compRender = record => {
  return (
    <DatePicker disabled={record.isReadonly} />
  );
};

export default {
  show: StaticDisplay,
  edit: compRender
};
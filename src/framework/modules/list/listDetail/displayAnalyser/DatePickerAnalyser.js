/**
 * Created by baoyinghai on 11/17/16.
 */
import React from 'react';
import { DatePicker } from 'mxa';

const compRender = (record, model) => {
  return (
    <DatePicker disabled={record.isReadonly || model === 'show'} />
  );
};

export default compRender;

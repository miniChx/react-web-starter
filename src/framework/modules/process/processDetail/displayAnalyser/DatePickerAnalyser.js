/**
 * Created by vison on 11/17/16.
 */
import React from 'react';
import { DatePicker } from 'antd';

const compRender = record => {
  return (
    <DatePicker disabled={record.isReadonly} />
  );
};

export default compRender;

/**
 * Created by vison on 11/17/16.
 */
import React from 'react';
import { Input } from 'antd';

const compRender = record => {
  return (
    <Input disabled={record.isReadonly} />
  );
};

export default compRender;

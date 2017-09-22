/**
 * Created by vison on 12/7/16.
 */
import React from 'react';
import { Input } from 'antd';
import staticDisplay from './StaticDisplay';
import { VIEW, EDIT } from '../../constant';

const compRender = record => {
  return (
    <Input type="textarea" rows={4} disabled={record.isReadonly} />
  );
};

export default {
  [VIEW]: staticDisplay,
  [EDIT]: compRender
};

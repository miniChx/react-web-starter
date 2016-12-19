/**
 * Created by baoyinghai on 11/17/16.
 */
import React from 'react';
import { InputNumber } from 'mxa';
import staticDisplay from './StaticDisplay';
import { VIEW, EDIT } from '../../constant';

const compRender = record => {
  // const step = 0.01;
  const opt = (record.formValidate && record.formValidate.opt) || {};
  const { digit = 2 } = opt;
  return (
    <InputNumber disabled={record.isReadonly} step={Math.pow(0.1, digit)} />
  );
};

export default {
  [VIEW]: staticDisplay,
  [EDIT]: compRender
};

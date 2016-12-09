/**
 * Created by baoyinghai on 11/17/16.
 */
import React from 'react';
import { Checkbox } from 'mxa';
import staticDisplay from './StaticDisplay';
import { VIEW, EDIT } from '../../constant';

const compRender = record => {
  return (
    <Checkbox disabled={record.isReadonly} />
  );
};

export default {
  [VIEW]: staticDisplay,
  [EDIT]: compRender
};

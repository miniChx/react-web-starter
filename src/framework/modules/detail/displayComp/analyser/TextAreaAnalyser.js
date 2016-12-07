/**
 * Created by baoyinghai on 12/7/16.
 */
import React from 'react';
import { Input } from 'mxa';
import staticDisplay from './StaticDisplay';

const compRender = record => {
  return (
    <Input type="textarea" rows={4} disabled={record.isReadonly} />
  );
};

export default {
  show: staticDisplay,
  edit: compRender
};

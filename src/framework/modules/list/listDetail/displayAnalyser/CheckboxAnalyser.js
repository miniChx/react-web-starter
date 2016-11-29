/**
 * Created by baoyinghai on 11/17/16.
 */
import React from 'react';
import { Checkbox } from 'mxa';

const compRender = (record, model) => {
  return (
    <Checkbox disabled={record.isReadonly || model === 'show'} />
  );
};

export default compRender;

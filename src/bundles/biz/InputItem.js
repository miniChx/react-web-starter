/**
 * Created by baoyinghai on 11/17/16.
 */
import React from 'react';
import { Input } from 'mxa';
import StaticDisplay from '../../framework/modules/detail/displayComp/analyser/StaticDisplay';

const compRender = field => {
  return (
    <Input disabled={false} />
  );
};

export default {
  show: StaticDisplay,
  edit: compRender
};

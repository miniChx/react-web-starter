/**
 * Created by baoyinghai on 11/17/16.
 */
import React from 'react';
import { Input, Button } from 'mxa';
import StaticDisplay from '../../framework/modules/detail/displayComp/analyser/StaticDisplay';

class CompWrapper extends React.Component {

  render() {
    return (
      <Input {...this.props} />
    );
  }
}

const compRender = record => {
  return (
    <CompWrapper />
  );
};

export default {
  VIEW: StaticDisplay,
  EDIT: compRender
};

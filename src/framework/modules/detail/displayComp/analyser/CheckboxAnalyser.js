/**
 * Created by baoyinghai on 11/17/16.
 */
import React from 'react';
import { Checkbox } from 'mxa';
import staticDisplay from './StaticDisplay';
import { VIEW, EDIT } from '../../constant';

class CheckboxWrapper extends React.Component {
  render() {
    return (
      <Checkbox {...this.props} checked={this.props.value} />
    );
  }
}

const compRender = record => {
  return (
    <CheckboxWrapper disabled={record.isReadonly} />
  );
};

export default {
  [VIEW]: staticDisplay,
  [EDIT]: compRender
};

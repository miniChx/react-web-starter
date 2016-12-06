/**
 * Created by baoyinghai on 11/17/16.
 */
import React from 'react';
import { TimePicker } from 'mxa';
import moment from 'moment';
// import StaticDisplay from './StaticDisplay';

const compRender = record => {
  return (
    <TimePicker disabled={record.isReadonly} />
  );
};

class StaticDisplay extends React.Component {
  render() {
    return (
      <span>{this.props.value && this.props.value.format('HH:mm:ss')}</span>
    );
  }
}

export default {
  show: () => (<StaticDisplay />),
  edit: compRender
};

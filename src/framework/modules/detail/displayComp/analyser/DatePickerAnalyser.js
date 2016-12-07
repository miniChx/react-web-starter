/**
 * Created by baoyinghai on 11/17/16.
 */
import React from 'react';
import { DatePicker } from 'mxa';
import moment from 'moment';
// import StaticDisplay from './StaticDisplay';

const compRender = record => {
  return (
    <DatePicker disabled={record.isReadonly} />
  );
};


class StaticDisplay extends React.Component {
  render() {
    return (
      <span>{this.props.value && this.props.value.format('YYYY-MM-DD')}</span>
    );
  }
}

export default {
  show: () => (<StaticDisplay />),
  edit: compRender
};
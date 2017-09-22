/**
 * Created by vison on 11/17/16.
 */
import React from 'react';
import { TimePicker } from 'antd';
import moment from 'moment';
import { VIEW, EDIT } from '../../constant';

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
  [VIEW]: () => (<StaticDisplay />),
  [EDIT]: compRender
};

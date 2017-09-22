/**
 * Created by vison on 11/17/16.
 */
import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { VIEW, EDIT } from '../../constant';

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
  [VIEW]: () => (<StaticDisplay />),
  [EDIT]: compRender
};

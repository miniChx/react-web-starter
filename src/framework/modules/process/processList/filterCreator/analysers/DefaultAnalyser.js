/**
 * Created by vison on 11/16/16.
 */
import React from 'react';
import { Select, Input, Radio, Row, Col, Checkbox } from 'antd';
import { override } from 'core-decorators';

import AbstractAnalyser from './AbstractAnalyser';

export default class DefaultAnalyser extends AbstractAnalyser {

  @override
  render() {
    const filter = this.args[0];
    return (
      <span key={filter.order}>{'unknow component style:[' + filter.displayStyle + ']'}</span>
    );
  }
}

/**
 * Created by baoyinghai on 11/16/16.
 */
import React from 'react';
import { Select, Input, Radio, Row, Col, Checkbox } from 'mxa';
import { override } from 'core-decorators';

import AbstractAnalyser from './AbstractAnalyser';
import styles from '../../../../../../styles/views/listview.less';
import executeJS from '../JSExecutor';
import { dispatch } from '../../../../../service/DispatchService';

const Option = Select.Option;

export default class DropDownListAnalyser extends AbstractAnalyser {

  handleChange = e => {
    let v = e;
    if (e && e.indexOf && e.indexOf('${') >= 0) {
      console.log('is a function');
      const itemVar = executeJS(e);
      v = itemVar;
    }
    const filter = this.args[0];
    this.updateFilterParam(filter.formProperty0, v);
  };

  @override
  render() {
    const filter = this.args[0];
    return (
      <div key={filter.order} className={styles.filter}>
        <span>{' ' + filter.label + ': '}</span>
        <Select onChange={this.handleChange} placeholder="请选择" className={styles.select} >
          {filter.optionalValues
            && filter.optionalValues.map((opt, index) =>
             (<Option key={index} value={opt.itemValue || opt.itemIndex} >{opt.itemText}</Option>))
          }
        </Select>
      </div>
    );
  }
}

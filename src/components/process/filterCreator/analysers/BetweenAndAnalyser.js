/**
 * Created by baoyinghai on 11/16/16.
 */
import React from 'react';
import { Select, Input, Radio, Row, Col, Checkbox } from 'mxa';
import { override } from 'core-decorators';

import AbstractAnalyser from './AbstractAnalyser';
import styles from '../../../../styles/views/listview.less';

import executeJS from '../JSExecutor';
import { dispatch } from '../../../../service/DispatchService';


export default class BetweenAndAnalyser extends AbstractAnalyser {

  handleChange = e => {
    // dispatch(replace);
    if (e && e.indexOf('${') >= 0) {
      console.log('is a function');
      const itemVar = executeJS(e);
      console.log(itemVar);
    } else {
      console.log(e);
    }
  };

  @override
  render() {
    const filter = this.args[0];
    return (
      <div key={filter.order} className={styles.filter}>
        <span>{' ' + filter.label + ': '}</span>
        <Input className={styles.input} placeholder={'较小值'} onChange={this.handleInputChange} />
        <span> 和</span>
        <Input className={styles.input} placeholder={'较大值'} onChange={this.handleInputChange} />
        <span> 之间</span>
      </div>
    );
  }
}

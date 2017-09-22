/**
 * Created by vison on 11/16/16.
 */
import React from 'react';
import { Select, Input, Radio, Row, Col, Checkbox } from 'antd';
import { override } from 'core-decorators';

import AbstractAnalyser from './AbstractAnalyser';
import styles from '../../../../../styles/views/listview.less';


const Option = Select.Option;

export default class TextAnalyser extends AbstractAnalyser {

  handleInputChange = e => {
    const filter = this.args[0];
    this.updateFilterParam(filter.formProperty0, e.target.value);
  };

  handleCheckBox = e => {
    const filter = this.args[0];
    this.updateFilterParam(filter.formProperty1, e.target.checked);
  };

  @override
  render() {
    const filter = this.args[0];
    return (
      <div key={filter.order} className={styles.filter}>
        <span>{' ' + filter.label + ': '}</span>
        <Input className={styles.input} onChange={this.handleInputChange} />
        {filter.checkBoxAttached &&
        (<Checkbox className={styles.input} onChange={this.handleCheckBox} defaultChecked={filter.checkBoxAttached.defaultValue}>
          {filter.checkBoxAttached.label}
        </Checkbox>)
        }
      </div>
    );
  }
}

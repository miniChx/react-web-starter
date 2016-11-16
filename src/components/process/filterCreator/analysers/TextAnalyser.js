/**
 * Created by baoyinghai on 11/16/16.
 */
import React from 'react';
import { Select, Input, Radio, Row, Col, Checkbox } from 'mxa';
import { override } from 'core-decorators';

import AbstractAnalyser from './AbstractAnalyser';
import styles from '../../../../styles/views/listview.less';


const Option = Select.Option;

export default class TextAnalyser extends AbstractAnalyser {

  handleInputChange = e => {
    // dispatch();
    console.log(e);
  };

  @override
  render() {
    const filter = this.args[0];
    return (
      <div key={filter.order} className={styles.filter}>
        <span>{' ' + filter.label + ': '}</span>
        <Input className={styles.input} onChange={this.handleInputChange} />
        {filter.checkBoxAttached &&
        (<Checkbox className={styles.input} defaultChecked={filter.checkBoxAttached.defaultValue}>
          {filter.checkBoxAttached.label}
        </Checkbox>)
        }
      </div>
    );
  }
}

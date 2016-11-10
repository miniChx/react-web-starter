/**
 * Created by baoyinghai on 11/10/16.
 */
import React from 'react';
import { Select, Input, Radio, Row, Col, Checkbox } from 'mxa';
import { replace } from 'react-router-redux';
import styles from '../../../styles/views/listview.less';
import { handleChange, handleInputChange } from './FilterActions';

const Option = Select.Option;

// TODO: 份文件
const DropDownListAnalyser = filter => {
  return (
    <div key={filter.order} className={styles.filter}>
      <span>{' ' + filter.label + ': '}</span>
      <Select onChange={handleChange} placeholder="请选择" className={styles.select} >
        {filter.optionalValues && filter.optionalValues.map((opt, index) =>
          (<Option value={opt.itemValue} key={'option_' + index}>{opt.itemText}</Option>))
        }
      </Select>
    </div>
  );
};

const BetweenAndAnalyser = filter => {
  return (
    <div key={filter.order} className={styles.filter}>
      <span>{' ' + filter.label + ': '}</span>
      <Input className={styles.input} placeholder={'较小值'} onChange={handleInputChange} />
      <span> 和</span>
      <Input className={styles.input} placeholder={'较大值'} onChange={handleInputChange} />
      <span> 之间</span>
    </div>
  );
};

const TextAnalyser = filter => {
  return (
    <div key={filter.order} className={styles.filter}>
      <span>{' ' + filter.label + ': '}</span>
      <Input className={styles.input} onChange={handleInputChange} />
      {filter.checkBoxAttached &&
      (<Checkbox className={styles.input} defaultChecked={filter.checkBoxAttached.defaultValue}>
        {filter.checkBoxAttached.label}
      </Checkbox>)
      }
    </div>
  );
};

const DefaultAnalyser = filter => {
  return (
    <span key={filter.order}>{'unknow component style:[' + filter.displayStyle + ']'}</span>
  );
};


const renderFucMap = {
  DropDownListAnalyser,
  BetweenAndAnalyser,
  TextAnalyser,
  DefaultAnalyser
};

export default type => {
  const handle = renderFucMap[type + 'Analyser'] || renderFucMap.DefaultAnalyser;
  return (item, text, record, index) => handle(item, text, record, index);
};

/**
 * Created by vison on 11/3/16.
 */
import React from 'react';
import { Button } from 'antd';
import { getValueByKey } from '../../../../utils/MapUtils';
import actionTrigger from './ActionAnalyser';

// TODO: 份文件
const BlockAnalyser = (item, text, record, index, props) => (<span>{text}</span>);

const HyperlinkAnalyser = (item, text, record, index, props) => {
  const keys = item.fieldName.split('.');
  return (
    <a onClick={() => actionTrigger(record, keys[0], props)}>
      {item.displayText || getValueByKey(record, '', ...keys)}
    </a>);
};


const ButtonAnalyser = (item, text, record, index, props) => {
  const keys = item.fieldName.split('.') || [];
  return (
    <Button type="ghost" onClick={() => actionTrigger(record, keys[0], props)}>
      {item.displayText || getValueByKey(record, '', ...keys)}
    </Button>
  );
};

const DefaultAnalyser = (item, text, record, index, props) => (<span>{text}</span>);

const renderFucMap = {
  BlockAnalyser,
  HyperlinkAnalyser,
  ButtonAnalyser,
  DefaultAnalyser
};

export default type => {
  const handle = renderFucMap[type + 'Analyser'] || renderFucMap.DefaultAnalyser;
  return (item, text, record, index, props) => handle(item, text, record, index, props);
};

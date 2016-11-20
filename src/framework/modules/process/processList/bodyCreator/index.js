/**
 * Created by baoyinghai on 11/3/16.
 */
import React from 'react';
import { Button } from 'mxa';
import { getValueByKey } from '../../../../../common/utils/MapUtils';
import actionTrigger from './ActionAnalyser';

// TODO: 份文件
const BlockAnalyser = (item, text, record, index) => (<span>{text}</span>);

const HyperlinkAnalyser = (item, text, record, index) => {
  const keys = item.fieldName.split('.');
  return (
    <a onClick={() => actionTrigger(record, keys[0])}>
      {item.displayText || getValueByKey(record, '', ...keys)}
    </a>);
};


const ButtonAnalyser = (item, text, record, index) => {
  const keys = item.fieldName.split('.') || [];
  return (
    <Button type="ghost" onClick={() => actionTrigger(record, keys[0])}>
      {item.displayText || getValueByKey(record, '', ...keys)}
    </Button>
  );
};

const DefaultAnalyser = (item, text, record, index) => (<span>{text}</span>);

const renderFucMap = {
  BlockAnalyser,
  HyperlinkAnalyser,
  ButtonAnalyser,
  DefaultAnalyser
};

export default type => {
  const handle = renderFucMap[type + 'Analyser'] || renderFucMap.DefaultAnalyser;
  return (item, text, record, index) => handle(item, text, record, index);
};

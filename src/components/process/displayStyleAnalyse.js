/**
 * Created by baoyinghai on 11/3/16.
 */
import React from 'react';
import { Button } from 'mxa';
import { getValueByKey } from '../../common/utils/MapUtils';

const buttonClick = (record, keyName) => {
  const operation = record[keyName] || {};
  console.log('url:', operation.actionUrl);
  const requestParams = operation.requestParams || [];
  const param = {};
  requestParams.every(paramName => {
    param[paramName] = record[paramName];
    return false;
  });
  console.log('param:', param);
};

const linkClick = (record, keyName) => {
  const operation = record[keyName] || {};
  console.log('url:', operation.actionUrl);
};

const BlockAnalyser = (item, text, record, index) => (<span>{text}</span>);

const HyperlinkAnalyser = (item, text, record, index) => (
  <a onClick={() => linkClick(record, item.fieldName.split('.')[0])}>
    {item.displayText || getValueByKey(record, '', ...item.fieldName.split('.'))}
  </a>);

const ButtonAnalyser = (item, text, record, index) => {
  // console.log(item, text, record, index, Button);
  return (
    <Button type="ghost" onClick={() => buttonClick(record, item.fieldName.split('.')[0])}>
      {item.displayText || getValueByKey(record, '', ...item.fieldName.split('.'))}
    </Button>
  );
};

const DefaultAnalyser = (item, text, record, index) => (<span>{text}</span>);

const switchList = {
  BlockAnalyser,
  HyperlinkAnalyser,
  ButtonAnalyser,
  DefaultAnalyser
};

export default type => {
  const handle = switchList[type + 'Analyser'] || switchList.DefaultAnalyser;
  return (item, text, record, index) => handle(item, text, record, index);
};

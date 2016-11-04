/**
 * Created by baoyinghai on 11/3/16.
 */
import React from 'react';
import { Button } from 'mxa';
import { getValueByKey } from '../../common/utils/MapUtils';

export const switchList = {
  Block: (item, text, record, index) => (<span>{text}</span>),
  Hyperlink: (item, text, record, index) => (<a href="#">{item.displayText}</a>),
  Button: (item, text, record, index) => (
    <Button type="ghost" onClick={() => console.log(item)}>
      {getValueByKey(record, '', ...item.fieldName.split('.'))}
    </Button>
  ),
  notMatch: (item, text, record, index) => (<span>{text}</span>)
};

export default type => {
  const handle = switchList[type] || switchList.notMatch;
  return (item, text, record, index) => handle(item, text, record, index);
};

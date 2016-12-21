/**
 * Created by baoyinghai on 12/7/16.
 */
import React from 'react';
import { Input, Button } from 'mxa';

import staticDisplay from './StaticDisplay';
import ModalInput from '../../../../../components/modalInput';
import Compose from '../../../../utils/Compose';
import AsyncDecorator from '../../../../pageContainer/ModalAsyncDecorator';
import InitDecorator from '../../../../pageContainer/InitDecorator';
import { VIEW, EDIT } from '../../constant';

const compRender = (record, changeInitValue) => {
  const TempPage = Compose(AsyncDecorator, InitDecorator)();
  // 模板中调用this.props.callback可以执行回调
  const modalData = record.modalInput;

  // TODO. to debug with be
  // const mappingFields = record.modalInput.mappingFields;
  const mappingFields = (record && record.modalInput && record.modalInput.mappings && record.modalInput.mappings.mapping) || [];
  let mapper;
  if (mappingFields.length > 0) {
    mapper = value => value[mappingFields[0].remoteFieldName];
  }

  const resetValue = value => {
    console.log(value);
    const newValue = {};
    mappingFields && mappingFields.forEach(m => {
      newValue[m.fieldName] = value[m.remoteFieldName];
    });
    changeInitValue(newValue);
  };

  return (
    <ModalInput mapper={mapper} resetValue={resetValue} >
      <TempPage domainType={modalData.domainType} domainLink={modalData.domainLink} />
    </ModalInput>
  );
};

export default {
  [VIEW]: staticDisplay,
  [EDIT]: compRender
};

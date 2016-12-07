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


// class TempPage extends React.Component {
//
//   render() {
//     const TempPage = Compose(AsyncDecorator, InitDecorator)();
//     return  <TempPage domainType={modalData.domainType} domainLink={modalData.domainLink} />
//   }
// }


const compRender = record => {
  const TempPage = Compose(AsyncDecorator, InitDecorator)();
  // 模板中调用this.props.callback可以执行回调
  const modalData = record.modalInput;

  // TODO. to debug with be
  // const mappingFields = record.modalInput.mappingFields;
  const mappingFields = [
    {
      fieldName: 'field1',
      remoteFieldName: 'leaseeName'
    }, {
      fieldName: 'field2',
      remoteFieldName: 'field2'
    },
  ];

  const mapper = value => value[mappingFields[0].remoteFieldName];
  return (
    <ModalInput mapper={mapper} onChange={value => console.log('ModalInput *** ', value)}>
      <TempPage domainType={modalData.domainType} domainLink={modalData.domainLink} />
    </ModalInput>
  );
};

export default {
  show: staticDisplay,
  edit: compRender
};

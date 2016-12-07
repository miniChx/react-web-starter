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

const compRender = record => {
  const TempPage = Compose(AsyncDecorator, InitDecorator)();
  // 模板中调用this.props.callback可以执行回调
  const modalData = record.modalInput;
  return (
    <ModalInput >
      <TempPage domainType={modalData.domainType} domainLink={modalData.domainLink} />
    </ModalInput>
  );
};

export default {
  show: staticDisplay,
  edit: compRender
};

/**
 * Created by baoyinghai on 12/7/16.
 */
import React from 'react';
import { Input, Button } from 'mxa';

import StaticDisplay from './StaticDisplay';
import ModalInput from '../../../../../components/modalInput';
import Compose from '../../../../utils/Compose';
import AsyncDecorator from '../../../../pageContainer/ModalAsyncDecorator';
import InitDecorator from '../../../../pageContainer/InitDecorator';

class ModalBody extends React.Component {
  render() {
    return (
      <Button onClick={this.props.callback} >text</Button>
    );
  }
}

const compRender = record => {
  const TempPage = Compose(AsyncDecorator, InitDecorator)();
  const modalData = record.modalInput;
  return (
    <ModalInput >
      <TempPage domainType={modalData.domainType} domainLink={modalData.domainLink} />
    </ModalInput>
  );
};

export default {
  show: StaticDisplay,
  edit: compRender
};

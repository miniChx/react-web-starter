/**
 * Created by baoyinghai on 11/17/16.
 */
import React from 'react';
import { Input, Button } from 'mxa';
import StaticDisplay from '../../framework/modules/detail/displayComp/analyser/StaticDisplay';
import ModalInput from '../../components/modalInput';

class ModalBody extends React.Component {
  render() {
    return (
      <Button onClick={this.props.callback} >text</Button>
    );
  }
}

const compRender = record => {
  return (
    <ModalInput >
      <ModalBody />
    </ModalInput>
  );
};

export default {
  show: StaticDisplay,
  edit: compRender
};

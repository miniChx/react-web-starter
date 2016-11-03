
import React from 'react';
import ReactDOM from 'react-dom';
import MaskLayer from 'react-mask-layer';
import 'react-mask-layer/assets/index.css';


import Compose from '../../common/utils/Compose';
import AsyncDecorator from './AsyncDecorator';
import InitDecorator from './InitDecorator';

const showModal = (params, domainType, domainLink) => {
  const maskDiv = document.createElement('div');
  document.body.appendChild(maskDiv);

  const _close = () => {
    const unmountResult = ReactDOM.unmountComponentAtNode(maskDiv);
    if (unmountResult) {
      maskDiv.parentNode.removeChild(maskDiv);
    }
  };

  const ModalPage = Compose(AsyncDecorator, InitDecorator)();
  const maskModal = (
    <MaskLayer visible={true} onCancel={_close}>
      <ModalPage params={params} domainType={domainType} domainLink={domainLink} />
    </MaskLayer>
  );

  ReactDOM.render(
    maskModal,
    maskDiv
  );
};

// eslint-disable-next-line import/prefer-default-export
export { showModal };

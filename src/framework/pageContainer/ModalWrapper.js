
import React from 'react';
import ReactDOM from 'react-dom';
import MaskLayer from 'react-mask-layer';
import 'react-mask-layer/assets/index.css';

import appStyle from '../styles/views/modal.less';
import Compose from '../utils/Compose';
import AsyncDecorator from './ModalAsyncDecorator';
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
  const self = {};
  const ModalPage = Compose(AsyncDecorator, InitDecorator)();
  const maskModal = (
    <MaskLayer visible={true} onCancel={_close} zIndex="999">
      <div className={appStyle.modalContainer} ref={node => { self.container = node; }}>
        <ModalPage target={() => self.container} params={params} domainType={domainType} domainLink={domainLink} />
      </div>
    </MaskLayer>
  );

  ReactDOM.render(
    maskModal,
    maskDiv
  );
};

// eslint-disable-next-line import/prefer-default-export
export { showModal };

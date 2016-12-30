
import React from 'react';
import ReactDOM from 'react-dom';
import MaskLayer from 'react-mask-layer';
import { Icon } from 'mxa';

import 'react-mask-layer/assets/index.css';

import appStyle from '../styles/views/modal.less';
import Compose from '../utils/Compose';
import AsyncDecorator from './ModalAsyncDecorator';
import InitDecorator from './InitDecorator';

export const closeBar = cb => (
  <div className={appStyle.closeBar}>
    <a onClick={cb}><Icon className={appStyle.closeFlag} type="close" /></a>
  </div>
);

const showModal = (params, domainType, domainLink, callback) => {
  const maskDiv = document.createElement('div');
  document.body.appendChild(maskDiv);

  const _close = () => {
    const unmountResult = ReactDOM.unmountComponentAtNode(maskDiv);
    if (unmountResult) {
      maskDiv.parentNode.removeChild(maskDiv);
    }
  };

  const _modalCallback = value => {
    _close();
    callback && callback(value);
  };

  const self = {};
  const ModalPage = Compose(AsyncDecorator, InitDecorator)();
  const maskModal = (
    <MaskLayer wrapClassName={appStyle.modalWrapper} visible={true} onCancel={_close} zIndex="999" maskClosable={false}>
      <div>
        {closeBar(_close)}
        <div className={appStyle.modalContainer} ref={node => { self.container = node; }}>
          <ModalPage
            target={() => self.container}
            params={params}
            isModal={true}
            modalCallback={_modalCallback}
            domainType={domainType}
            domainLink={domainLink}
          />
        </div>
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

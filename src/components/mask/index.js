
import React from 'react';
import ReactDOM from 'react-dom';
import MaskLayer from 'react-mask-layer';
import 'react-mask-layer/assets/index.css';
import { closeBar } from '../../framework/pageContainer/ModalWrapper';

const showComponent = (component, params) => {
  const maskDiv = document.createElement('div');
  document.body.appendChild(maskDiv);

  const _close = () => {
    const unmountResult = ReactDOM.unmountComponentAtNode(maskDiv);
    if (unmountResult) {
      maskDiv.parentNode.removeChild(maskDiv);
    }
  };

  const _callback = value => {
    _close();
    if (params.callback) {
      params.callback(value);
    }
  };

  const mergedComponent = React.cloneElement(component, { ...params, isModal: true, modalCallback: _callback, close: _close });
  const maskModal = (
    <MaskLayer
      maskClosable={false}
      visible={true}
      onCancel={_close}
      zIndex="999"
    >
      <div>
        {closeBar(_close)}
        {mergedComponent}
      </div>
    </MaskLayer>
  );

  ReactDOM.render(
    maskModal,
    maskDiv
  );
};

// eslint-disable-next-line import/prefer-default-export
export { showComponent };

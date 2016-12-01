
import React from 'react';
import ReactDOM from 'react-dom';
import MaskLayer from 'react-mask-layer';
import 'react-mask-layer/assets/index.css';

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

  const mergedComponent = React.cloneElement(component, { ...params, callback: _callback });
  const maskModal = (
    <MaskLayer visible={true} onCancel={_close} zIndex="500">
      {mergedComponent}
    </MaskLayer>
  );

  ReactDOM.render(
    maskModal,
    maskDiv
  );
};

// eslint-disable-next-line import/prefer-default-export
export { showComponent };

/**
 * 页面跳转
 */
import React, { PropTypes } from 'react';
import { push } from 'react-router-redux';
import { autobind } from 'core-decorators';
import { Button, Modal, Tooltip } from 'antd';
import Qs from 'qs';
import { trimStart } from 'lodash/string';
import { CONTAINER_PRE } from '../../../framework/routes';
import { showModal } from '../../../framework/pageContainer/ModalWrapper';
import { PFetch } from '../../../framework/system/fetch';
import { longRunExec } from '../../../framework/system/longRunOpt';
import { jumpToNewTab } from '../../../framework/utils/windowUtils';

import { BUTTON_INTERACTIVETYPE } from '../../../framework/constant/dictCodes';

const jump = (params, actionLink, props, next) => {
  params.displayType = props.displayType;
  const templateType = props.templateType || props.domainType;
  const mode = props.interactiveType;
  // console.log('lalal opener', window.opener && window.opener._windowHandler);
  if (mode === BUTTON_INTERACTIVETYPE.PAGE) {
    jumpToNewTab(
      '/' + CONTAINER_PRE + actionLink + '?p=' + btoa(Qs.stringify({ ...params, domainType: templateType, s: '1' })),
      props
    );
    if (props.isModal && props.modalCallback) {
      props.modalCallback();
    }
  } else if (mode === BUTTON_INTERACTIVETYPE.MODAL || mode === BUTTON_INTERACTIVETYPE.RIGHTDRAWER) {
    showModal({ ...params, modalTitle: props.buttonDescription }, templateType, actionLink, () => props.onRefresh && props.onRefresh());
  } else if (mode === BUTTON_INTERACTIVETYPE.REPLACE) {
    props.dispatch(push({
      pathname: '/' + CONTAINER_PRE + actionLink,
      query: { p: btoa(Qs.stringify({ ...params, domainType: templateType })) }
    }));
  } else if (mode === BUTTON_INTERACTIVETYPE.REFRESH) {
    props.onRefresh && props.onRefresh(params);
  }
  // if (props.isModal && props.modalCallback) {
  //   props.modalCallback();
  // }
  next();
};

export default {
  next: jump
};

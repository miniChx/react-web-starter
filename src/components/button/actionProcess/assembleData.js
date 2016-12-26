/**
 * 收集数据
 */
import React from 'react';
import { Modal } from 'mxa';
import {
  LIST_SELECTTYPE,
  BUTTON_INTERACTIVETYPE,
  BUTTON_MESSAGEPROMPTTYPE,
  BUTTON_RELATEDDATA,
  BUTTON_BINDPARAMETERTYPE,
  BUTTON_ACTIONTYPE
} from '../../../framework/constant/dictCodes';

import routerChange from './routerChange';
import triggerRequest from './triggerRequest';

const confirm = Modal.confirm;

const genCustomParams = props => {
  const { record, buttonDescription, inject } = props;
  let customParams = {};
  if (props.bindParameterType === BUTTON_BINDPARAMETERTYPE.CUSTOMIZE) {
    if (inject.buttons && inject.buttons.length > 0) {
      const injectAction = inject.buttons.filter(button => button.key === buttonDescription);
      if (injectAction && injectAction.length > 0 && injectAction[0].action) {
        customParams = injectAction[0].action({ props, record });
      }
    }
  }
  return customParams;
};

const triggerActionWithoutRows = (data, props, next) => {
  const params = { ...props.query, ...genCustomParams(props) };
  if (props.messagePromptType === BUTTON_MESSAGEPROMPTTYPE.CONFIRM) {
    confirm({
      title: '提示',
      content: (<div>确认{props.buttonDescription}吗？</div>),
      onOk: () => next(params),
      onCancel() {},
    });
  } else {
    next(params);
  }
};

const triggerActionWithoutForm = (data, props, next) => {
  const params = { ...props.query, ...genCustomParams(props) };
  const cb = () => {
    if (props.submitFuc) {
      props.submitFuc(values => {
        next({ ...params, ...values });
      });
    } else {
      next(params);
    }
  };
  if (props.messagePromptType === BUTTON_MESSAGEPROMPTTYPE.CONFIRM) {
    confirm({
      title: '提示',
      content: (<div>确认{props.buttonDescription}吗？</div>),
      onOk: () => cb(),
      onCancel() {},
    });
  } else {
    cb();
  }
};

const genParams = (record, props) => {
  const params = {
    [props.mainEntityKey]: record[props.mainEntityKey],
    ...props.query,
    ...genCustomParams(props),
  };
  if (props.bindParameterType === BUTTON_BINDPARAMETERTYPE.SEVERAL) {
    props.bindParameters.forEach(item => {
      params[item.name] = item.value || props.query[item.value];
    });
  }

  if (props.transmitParameters && props.transmitParameters.length > 0) {
    props.transmitParameters.forEach(item => {
      params[item.name] = record[item.name];
    });
  }
  return params;
};

const triggerActionSingle = (activeData, props, next) => {
  const params = genParams(activeData, props);
  if (props.messagePromptType === BUTTON_MESSAGEPROMPTTYPE.CONFIRM) {
    confirm({
      title: '提示',
      content: (<div>确认{props.buttonDescription}{activeData.leaseeName}吗？</div>),
      onOk: () => next(params),
      onCancel() {},
    });
  } else {
    next(params);
  }
};

const triggerActionMultiple = (activeData, props, next) => {
  const params = activeData.map(record => this._genParams(record));
  if (props.messagePromptType === BUTTON_MESSAGEPROMPTTYPE.CONFIRM) {
    confirm({
      title: '提示',
      content: (<div>确认{props.buttonDescription}所选数据吗？</div>),
      onOk: () => next(params),
      onCancel() {},
    });
  } else {
    next(params);
  }
};

const collectData = (p, props, next) => {
  const { record } = props;
  if (props.relatedData === BUTTON_RELATEDDATA.NONE) {
    triggerActionWithoutRows({}, props, next);
  } else if (props.relatedData === BUTTON_RELATEDDATA.FORM) {
    triggerActionWithoutForm({}, props, next);
  } else if (props.inline) {
    triggerActionSingle(record, props, next);
  } else if (props.selectedType !== LIST_SELECTTYPE.CHECKBOX
    || props.relatedData === BUTTON_RELATEDDATA.SINGLE) {
    triggerActionSingle(record[0], props, next);
  } else {
    triggerActionMultiple(record, props, next);
  }
};

const createTriggerRequest = () => {
  return {
    next: (d, p, next) => {
      triggerRequest.next({ params: d, url: p.actionLink || p.domainLink }, p, next);
    },
    ctrl: triggerRequest.ctrl
  };
};

const createRouterChange = () => {
  return {
    next: (d, p, next) => {
      routerChange.next(d, p.actionLink || p.domainLink, p);
    }
  };
};

export default {
  next: collectData,
  ctrl: (data, props, processCtrl) => {
    if (props.actionType === BUTTON_ACTIONTYPE.REQUEST) {
      processCtrl.push(createTriggerRequest());
    } else if (props.actionType === BUTTON_ACTIONTYPE.ROUTER) {
      processCtrl.push(createRouterChange());
    } else {
      // 默认 ROUTER
      processCtrl.push(createRouterChange());
    }
  }
};

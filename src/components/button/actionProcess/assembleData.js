/**
 * 收集数据
 */
import {
  LIST_SELECTTYPE,
  BUTTON_INTERACTIVETYPE,
  BUTTON_MESSAGEPROMPTTYPE,
  BUTTON_RELATEDATA,
  BUTTON_BINDPARAMETERTYPE,
  BUTTON_ACTIONTYPE
} from '../../../framework/constant/dictCodes';

import lastAction from './lastAction';
import triggerRequest from './triggerRequest';

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
  if (props.submitFuc) {
    props.submitFuc(values => {
      next({ ...params, ...values });
    });
  } else {
    next(params);
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
  next(params);
};

const triggerActionMultiple = (activeData, props, next) => {
  const params = activeData.map(record => this._genParams(record));
  next(params);
};

const collectData = (p, props, next) => {
  const { record } = props;
  if (props.relateData === BUTTON_RELATEDATA.NONE) {
    triggerActionWithoutRows({}, props, next);
  } else if (props.inline) {
    triggerActionSingle(record, props, next);
  } else if (props.selectedType !== LIST_SELECTTYPE.CHECKBOX
    || props.relateData === BUTTON_RELATEDATA.SINGLE) {
    triggerActionSingle(record[0], props, next);
  } else {
    triggerActionMultiple(record, props, next);
  }
};

export default {
  next: collectData,
  ctrl: (data, props, processCtrl) => {
    if (props.actionType === BUTTON_ACTIONTYPE.ROUTER) {
      processCtrl.push(lastAction);
    } else if (props.actionType === BUTTON_ACTIONTYPE.REQUEST) {
      processCtrl.push({
        next: (d, p, next) => {
          triggerRequest.next({ params: d, url: props.actionLink }, p, next);
        },
        ctrl: triggerRequest.ctrl
      });
    }
  }
};

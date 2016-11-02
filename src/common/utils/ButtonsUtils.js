/**
 * Created by cui on 16/11/1.
 */
/* eslint-disable */
export const getButtonsActionNameWithActionType = (buttonsBean, actionType) => {
  let actionUrl = null;
  if (buttonsBean && actionType) {
    buttonsBean.forEach((item) => {
      if (item.actionType === actionType) {
        actionUrl = item.key;
      }
    });
  }
  return actionUrl;
};

export const getButtonsActionNameWithActionText = (buttonsBean, actionText) => {
  let actionUrl = null;
  if (buttonsBean && actionText) {
    buttonsBean.forEach((item) => {
      if (item.text === actionText) {
        actionUrl = item.key;
      }
    });
  }
  return actionUrl;
};

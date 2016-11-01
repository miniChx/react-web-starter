/**
 * Created by cui on 16/11/1.
 */
/* eslint-disable */
export const getButtonsActionName = (buttonsBean, actionType) => {
  if (buttonsBean && actionType) {
    buttonsBean.forEach((item) => {
      if (item.actionType === actionType) {
        return item.actionName;
      }
      return null;
    });
  }
  return null;
};

/**
 * Created by baoyinghai on 12/23/16.
 */

import assembleData from './assembleData';

// 解决回调问题
const startProcess = () => {
  const processList = [assembleData];
  const nextFunc = data => {
    const step = processList.pop();
    if (step) {
      const next = step.next;
      const ctrl = step.ctrl;
      next && next(data, this.props, res => {
        ctrl && ctrl(res, this.props, processList);
        nextFunc(res);
      });
    }
  };
  nextFunc({});
};

export default startProcess;
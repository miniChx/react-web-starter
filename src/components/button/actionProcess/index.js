/**
 * Created by baoyinghai on 12/23/16.
 * 开始 －a－－－－－－|－－－－－－>－－－－－－－－－－－跳转－－－－－－－－－结束
         ｜          |                      ｜                   ｜
         ｜          ^                      ^                    ｜
         ｜          |                      ｜                   ｜
         ｜          |       －－－－－－－－－c－－－－刷新－－－－－－
         ｜          |      ｜              ｜
         －－采集数据－－－请求b－－－－－－nextLink
                           ｜              ｜
                           ｜              ｜
                           ｜－－confirm－－｜
 */

import assembleData from './assembleData';

// 解决回调问题
const startProcess = props => {
  const processList = [assembleData];
  const nextFunc = data => {
    const step = processList.pop();
    if (step) {
      const next = step.next;
      const ctrl = step.ctrl;
      next && next(data, props, res => {
        ctrl && ctrl(res, props, processList);
        nextFunc(res);
      });
    }
  };
  nextFunc({});
};

export default startProcess;

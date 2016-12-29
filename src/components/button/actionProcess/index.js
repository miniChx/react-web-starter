/**
 * Created by baoyinghai on 12/23/16.
 * 开始 －a－－－－－－|－－－－－－>－－－－－－－－－－－跳转－－－－－－－－－结束
 *       ｜          |                      ｜                   ｜
 *       ｜          ^                      ^                    ｜
 *       ｜          |                      ｜                   ｜
 *       ｜          |       －－－－－－－－－c－－－－刷新－－－－－－
 *       ｜          |      ｜              ｜
 *       －－采集数据－－－请求b－－－－－－nextLink
 *                         ｜              ｜
 *                         ｜              ｜
 *                         ｜－－confirm－－｜
 * render      router
 * renderByKey router
 * renderByKeys router
 * deleteByKey request
 * deleteByKeys request
 * save  request
 * customer request
 *
 * 如果要提交数据发生post行为的 actionType 为request 否则时 router
 *
 */

import assembleData from './assembleData';

// 解决回调问题
const startProcess = (props, stopLoading) => {
  const processList = [{ next: () => stopLoading(false) }, assembleData];
  const nextFunc = data => {
    const step = processList.pop();
    if (step) {
      const next = step.next;
      const ctrl = step.ctrl;
      next && next(data, props, res => {
        ctrl && ctrl(res, props, processList, stopLoading);
        nextFunc(res);
      });
    }
  };
  nextFunc({});
};

export default startProcess;

/**
 * Created by baoyinghai on 11/16/16.
 */
import React from 'react';
import { updateKey } from '../filterParam';

export default class AbstractAnalyser {

  constructor(...args) {
    this.args = args;
  }

  updateFilterParam(key, name) {
    updateKey(key, name);
  }

  render() {
    return (
      <span>请复写该方法</span>
    );
  }
}

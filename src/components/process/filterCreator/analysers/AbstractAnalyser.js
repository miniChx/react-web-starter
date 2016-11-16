/**
 * Created by baoyinghai on 11/16/16.
 */
import React from 'react';

export default class AbstractAnalyser {

  constructor(...args) {
    this.args = args;
  }

  render() {
    return (
      <span>请复写该方法</span>
    );
  }
}

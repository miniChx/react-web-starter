/**
 * Created by baoyinghai on 11/10/16.
 */
import React from 'react';
import { autobind } from 'core-decorators';
import detailCreator from './main';
import SwitchContainer from './switchContainer';

export default class ListDetail extends React.Component {

  /* eslint-disable */
  static propTypes = {
    createRules: React.PropTypes.func, // 自定义表单校验 // record
    beforeSubmit: React.PropTypes.func, // 表单提交之前 // callback
    afterSubmit: React.PropTypes.func, // 表单提交之后  //  err
    dataSource: React.PropTypes.object.isRequired,
    renderAnalyser: React.PropTypes.func // 自定义渲染标单项 // componentName
  };

  render() {
    const Main = detailCreator();
    return (
      <Main { ...this.props } />
    );
  }

}


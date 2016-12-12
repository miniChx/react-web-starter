/**
 * Created by baoyinghai on 11/10/16.
 */
import React from 'react';
import { autobind } from 'core-decorators';
import detailCreator from './main';
import SwitchContainer from './switchContainer';
import { VIEW, EDIT } from './constant';


export default class ListDetail extends React.Component {

  /* eslint-disable */
  static defaultProps = {
    model: EDIT
  };

  /* eslint-disable */
  static propTypes = {
    model: React.PropTypes.oneOf([VIEW, EDIT]),
    inject: React.PropTypes.object,
    createRules: React.PropTypes.func, // 自定义表单校验 // record
    beforeSubmit: React.PropTypes.func, // 表单提交之前 // callback
    afterSubmit: React.PropTypes.func, // 表单提交之后  //  err
    dataSource: React.PropTypes.object.isRequired,
    renderAnalyser: React.PropTypes.func // 自定义渲染标单项 // componentName
  };

  @autobind
  confirmModel() {
    return this.props.dataSource.displayType;
  }

  constructor(props) {
    super(props);
    // 检查buttons中是否有保存按钮
    //
    this.state = {
      model:  this.confirmModel() || this.props.model
    };
  }

  @autobind
  changeState() {
    if (this.state.model === VIEW) {
      this.setState({ model: EDIT });
    } else {
      this.setState({ model: VIEW });
    }
  }

  render() {
    const model = this.state.model;
    const mainProps = { ...this.props, model };
    const Main = detailCreator();
    return (
      <Main { ...mainProps } changeState={this.changeState} />
    );
  }

}


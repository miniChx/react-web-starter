/**
 * Created by baoyinghai on 11/10/16.
 */
import React from 'react';
import { autobind } from 'core-decorators';
import detailCreator from './main';
import SwitchContainer from './switchContainer';
import { VIEW, EDIT } from './constant';
import { BodyTitle } from '../../../components';


export default class ListDetail extends React.Component {

  /* eslint-disable */
  static defaultProps = {
    model: EDIT
  };

  /* eslint-disable */
  static propTypes = {
    displayType: React.PropTypes.oneOf([VIEW, EDIT]),
    inject: React.PropTypes.object,
    createRules: React.PropTypes.func, // 自定义表单校验 // record
    beforeSubmit: React.PropTypes.func, // 表单提交之前 // callback
    afterSubmit: React.PropTypes.func, // 表单提交之后  //  err
    dataSource: React.PropTypes.object.isRequired,
    renderAnalyser: React.PropTypes.func, // 自定义渲染标单项 // componentName
    renderButtonsSelf: React.PropTypes.func, // 自定义渲染按钮
  };

  @autobind
  confirmModel() {
    return this.props.dataSource.displayType || this.props.displayType || (this.props.params && this.props.params.displayType) || (this.props.query && this.props.query.displayType);
  }

  constructor(props) {
    super(props);
    // 检查buttons中是否有保存按钮
    //
    this.state = {
      model:  this.confirmModel() || this.props.model
    };
    this.originalOnBeforeUnload = null;
  }

  componentWillMount() {
    // this.originalOnBeforeUnload = window.onbeforeunload;
    // window.onbeforeunload = function (e) {
    //   return '关闭提示'; // 这个提示无效
    // };
  }

  componentWillUnmount() {
    // window.onbeforeunload =  this.originalOnBeforeUnload;
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
      <div>
        <BodyTitle title={this.props.menuValue} />
        <Main { ...mainProps } changeState={this.changeState} />
      </div>
    );
  }

}


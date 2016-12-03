/**
 * Created by baoyinghai on 11/10/16.
 */
import React from 'react';
import { autobind } from 'core-decorators';
import detailCreator from './main';
import SwitchContainer from './switchContainer';

export default class ListDetail extends React.Component {

  /* eslint-disable */
  static defaultProps = {
    model: 'show'
  };

  /* eslint-disable */
  static propTypes = {
    model: React.PropTypes.oneOf(['show', 'edit']),
    createRules: React.PropTypes.func, // 自定义表单校验 // record
    beforeSubmit: React.PropTypes.func, // 表单提交之前 // callback
    afterSubmit: React.PropTypes.func, // 表单提交之后  //  err
    dataSource: React.PropTypes.object.isRequired,
    renderAnalyser: React.PropTypes.func // 自定义渲染标单项 // componentName
  };

  constructor(props) {
    super(props);
    this.state = {
      model:  this.props.model
    };
  }

  @autobind
  changeState() {
    if (this.state.model === 'show') {
      this.setState({ model: 'edit' });
    } else {
      this.setState({ model: 'show' });
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


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

  @autobind
  confirmModel() {
    // let ret = this.props.dataSource && this.props.dataSource.detailResult ? 'show' : 'edit';
    // if (ret === 'show') {
    //   const buttons = this.props.dataSource.buttons || [];
    //   buttons.map(btn => {
    //     if (btn.buttonDescription === '保存') {
    //       ret = 'edit';
    //     }
    //   })
    // }
    // return ret;
    return 'edit';
  }

  constructor(props) {
    super(props);
    // 检查buttons中是否有保存按钮
    //
    this.state = {
      model:  this.confirmModel()
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


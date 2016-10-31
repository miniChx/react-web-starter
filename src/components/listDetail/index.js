/**
 * Created by baoyinghai on 10/25/16.
 */
import React from 'react';
import { Button, Row, Col } from 'mxa';
import FormDetail from '../formDetail';

const itemTypes = ['number', 'normal', 'normal', 'normal', 'normal', 'select', 'select', 'normal', 'cascader', 'select', 'number'];
const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];
const cascaderData = [{
  index: 8,
  datas: options
}];
/* eslint-disable */
export default class ListDetail extends React.Component {

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.updateClick = this.updateClick.bind(this);
    //const record = this.props.state().record;
    //const columns = this.props.state().columns;
    //const data = Object.keys(record).map(key => {
    //  const c = columns && columns.filter(col => col.key === key);
    //  return { label: c && c[0] && c[0].title, value: record[key] };
    //});
    this.state = {
      data: null
    };
  }

  componentWillReceiveProps(next) {
    if (next.initData) {
      this.initComponent(next.initData);
    }
  }

  // 跳转到该界面后, 有的界面需要fetch数据, 此方法会被执行
  initComponent(data) {
    console.log('fetchData ', data);
    this.setState({
      data
    });
  }

  goBack() {
    this.props.goBack();
  }

  updateClick(values) {
    console.log('updateClick' + values);
  }

  render() {
    return (
      <span>{JSON.stringify(this.state.data || {desc: '数据加载中...'})}</span>
    );
    //return (
    //  <div>
    //    <FormDetail dataSource={this.state.data} itemTypes={itemTypes} updateClick={(values) => this.updateClick(values)} cascaderData={cascaderData}/>
    //    <Button type="ghost" onClick={() => this.goBack()} >返回</Button>
    //  </div>
    //);
  }
}

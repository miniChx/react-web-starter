/**
 * Created by baoyinghai on 10/25/16.
 */
import React from 'react';
import { Form, Button, Row, Col, Input, InputNumber, Select, Cascader, Icon, Upload, message, TimePicker, Switch, Slider, Rate, Radio, DatePicker, Checkbox } from 'mxa';
import moment from 'moment';
import FormItemType from '../../constant/formItemType';

let ListDetail;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const plainOptions = ['Apple', 'Pear', 'Orange'];
const format = 'YYYY/MM/DD';
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
const uploadProps = {
  name: 'file',
  action: '/upload.do',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 文件上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败.`);
    }
  },
};
const cascaderData = [{
  index: 8,
  datas: options
}];
class ListDetailD extends React.Component {

  constructor(props) {
    super(props);
    this.updateClick = this.updateClick.bind(this);
    this.isUpdateClick = this.isUpdateClick.bind(this);
    this.state = {
      data: this.props.dataSource,
      isEditing: false
    };
  }

  updateClick(values) {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  isUpdateClick() {
    this.props.form.validateFields((errors, values) => {

    });
  }

  renderFormItem(item, index) {
    const { getFieldDecorator } = this.props.form;
    const detailResult = this.state.data.detailResult;
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 14 }
    };
    switch (item.displayComponent.componentType) {
      case FormItemType.INPUT:
        return (
          <FormItem label={item.description} {...formItemLayout}>
            {getFieldDecorator('row_' + index, { initialValue: detailResult[item.name] })(
              <Input />
            )}
          </FormItem>
        );
      case FormItemType.INPUTNUMBER:
        return (
          <FormItem label={item.description} {...formItemLayout}>
            {getFieldDecorator('row_' + index, { initialValue: detailResult[item.name] })(
              <InputNumber min={1} />
            )}
          </FormItem>
        );
      case FormItemType.SELECT:
        return (
          <FormItem label={item.description} {...formItemLayout}>
            {getFieldDecorator('row_' + index, { initialValue: detailResult[item.name] })(
              <Select style={{ width: 120 }}>
                {item.displayComponent.items.map((i, i1) =>
                  (
                    <Select.Option value={i}>{i}</Select.Option>
                  ))}
              </Select>
            )}
          </FormItem>
        );
      // 需要有options传入  placeholder需要修改
      case FormItemType.CASCADER:
        return (
          <FormItem label={item.description} {...formItemLayout}>
            {getFieldDecorator('row_' + index, { initialValue: detailResult[item.name] })(
              <Cascader options={item.displayComponent.items} placeholder="请选择" />
            )}
          </FormItem>
        );
      case FormItemType.AUTOCOMPLETE:
        return null;
      // 需要传入plainOptions 确认defaultValue的显示方式
      case FormItemType.CHECKBOX:
        return (
          <FormItem label={item.description} {...formItemLayout}>
            {getFieldDecorator('row_' + index, { initialValue: [detailResult[item.name]] })(
              <CheckboxGroup options={plainOptions} defaultValue={['Apple']} />
            )}
          </FormItem>
        );
      // 日期要显示当前数据
      case FormItemType.DATEPICKER:
        return (
          <FormItem label={item.description} {...formItemLayout}>
            {getFieldDecorator('row_' + index, { initialValue: moment('2015/01/01', format) })(
              <DatePicker defaultValue={moment('2015/01/01', format)} format={format} />
            )}
          </FormItem>
        );
      case FormItemType.RADIO:
        return (
          <FormItem label={item.description} {...formItemLayout}>
            {getFieldDecorator('row_' + index)(
              <RadioGroup onChange={this.onChange} value={this.state.value}>
                <Radio key="a" value={1}>A</Radio>
                <Radio key="b" value={2}>B</Radio>
                <Radio key="c" value={3}>C</Radio>
                <Radio key="d" value={4}>D</Radio>
              </RadioGroup>
            )}
          </FormItem>
        );
      case FormItemType.RATE:
        return (
          <FormItem label={item.description} {...formItemLayout}>
            {getFieldDecorator('row_' + index, { initialValue: detailResult[item.name] })(
              <Rate allowHalf={true} />
            )}
          </FormItem>
        );
      case FormItemType.SLIDER:
        return (
          <FormItem label={item.description} {...formItemLayout}>
            {getFieldDecorator('row_' + index, { initialValue: detailResult[item.name] })(
              <Slider />
            )}
          </FormItem>
        );
      case FormItemType.SWITCH:
        return (
          <FormItem label={item.description} {...formItemLayout}>
            {getFieldDecorator('row_' + index, { initialValue: detailResult[item.name] })(
              <Switch />
            )}
          </FormItem>
        );
      case FormItemType.TIMEPICKER:
        return (
          <FormItem label={item.description} {...formItemLayout}>
            {getFieldDecorator('row_' + index, { initialValue: detailResult[item.name] })(
              <TimePicker />
            )}
          </FormItem>
        );
      case FormItemType.TRANSFER:
        return (
          <FormItem label={item.description} {...formItemLayout}>
            {getFieldDecorator('row_' + index, { initialValue: detailResult[item.name] })(
              <TimePicker />
            )}
          </FormItem>
        );
      case FormItemType.TREESELECT:

        return null;
      case FormItemType.UPLOAD:
        return (
          <FormItem label={item.description} {...formItemLayout}>
            {getFieldDecorator('row_' + index, { initialValue: detailResult[item.name] })(
              <Upload {...uploadProps}>
                <Button type="ghost">
                  <Icon type="upload" /> 点击上传
                </Button>
              </Upload>
            )}
          </FormItem>
        );
      default:
        return null;

    }
  }

  render() {
    if (this.state.data) {
      if (this.state.isEditing) {
        return (
          <div>
            <Row>
              <Col offset={3}>
                <Form horizontal={true} style={{ maxWidth: 400 }}>
                  {this.state.data.fields.map((item, index) =>
                    (
                      <div key={'row_' + index}>
                        {this.renderFormItem(item, index)}
                      </div>
                    ))}
                </Form>
              </Col>
            </Row>
            <Row>
              <Col span="1" offset={5}>
                <Button type="primary" onClick={() => this.isUpdateClick()}>确认修改</Button>
              </Col>
              <Col span="1" offset={1}>
                <Button type="ghost" onClick={() => this.updateClick()}>取消</Button>
              </Col>
            </Row>
          </div>
        );
      }
      return (
        <div>
          {this.state.data.fields.map((item, index) =>
            (
              <Row key={'row_' + index}>
                <Col span={3} offset={3}>
                  <span>{item.description}:</span>
                </Col>
                <Col span={6}>
                  <span>{this.state.data.detailResult[item.name]}</span>
                </Col>
              </Row>
            ))}
          <Row>
            <Col offset={3}>
              <Button type="primary" onClick={() => this.updateClick()}>编辑</Button>
            </Col>
            <Col>
              <Button type="ghost" onClick={() => this.goBack()}>返回</Button>
            </Col>
          </Row>
        </div>
      );
    }
    return (
      <span>{'数据加载中...'}</span>
    );
  }
}
export default ListDetail = Form.create()(ListDetailD);

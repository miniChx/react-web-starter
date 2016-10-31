/**
 * Created by geweimin on 16/10/27.
 */
import React from 'react';
import { Form, Button, Row, Col, Input, InputNumber, Select, Cascader } from 'mxa';

/* eslint-disable */
let FormDetail;
const FormItem = Form.Item;
const plainOptions = ['Apple', 'Pear', 'Orange'];
const format = 'YYYY/MM/DD';
class FormDetailD extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    }
  }

  updateClick() {
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  renderFormItem(item, index) {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {span: 7},
      wrapperCol: {span: 14}
    };
    switch (this.props.itemTypes[index]) {
      case 'Input':
        return (
          <FormItem label={item.label} {...formItemLayout}>
            {getFieldDecorator('row_' + index, {initialValue: item.value})(
              <Input />
            )}
          </FormItem>
        );
        break;
      case 'InputNumber':
        return (
          <FormItem label={item.label} {...formItemLayout}>
            {getFieldDecorator('row_' + index, {initialValue: item.value})(
              <InputNumber min={1}/>
            )}
          </FormItem>
        );
        break;
      case 'Select':
        return (
          <FormItem label={item.label} {...formItemLayout}>
            {getFieldDecorator('row_' + index, {initialValue: item.value})(
              <Select style={{ width: 120 }}>
                <Select.Option value={item.value}>{item.value}</Select.Option>
                <Select.Option value="lucy">Lucy</Select.Option>
                <Select.Option value="disabled" disabled>Disabled</Select.Option>
                <Select.Option value="Yiminghe">yiminghe</Select.Option>
              </Select>
            )}
          </FormItem>
        );
        break;
      // 需要有options传入  placeholder需要修改
      case 'Cascader':
        let options = [];
        this.props.cascaderData.map((item, i) => {
          if (item.index == index) {
            options = item.datas;
          }
        });
        return (
          <FormItem label={item.label} {...formItemLayout}>
            {getFieldDecorator('row_' + index, {initialValue: item.value})(
              <Cascader options={options} placeholder="请选择" />
            )}
          </FormItem>
        );
        break;
      case 'AutoComplete':
        break;
      //需要传入plainOptions 确认defaultValue的显示方式
      case 'Checkbox':
        return (
          <FormItem label={item.label} {...formItemLayout}>
            {getFieldDecorator('row_' + index, {initialValue: [item.value]})(
              <CheckboxGroup options={plainOptions} defaultValue={['Apple']} />
            )}
          </FormItem>
        );
        break;
      // 日期要显示当前数据
      case 'DatePicker':
        return (
          <FormItem label={item.label} {...formItemLayout}>
            {getFieldDecorator('row_' + index, {initialValue: moment('2015/01/01', format)})(
              <DatePicker defaultValue={moment('2015/01/01', format)} format={format} />
            )}
          </FormItem>
        );
        break;
      case 'Radio':
        return (
          <FormItem label={item.label} {...formItemLayout}>
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
        break;
      case 'Rate':
        return (
          <FormItem label={item.label} {...formItemLayout}>
            {getFieldDecorator('row_' + index, {initialValue: item.value})(
              <Rate allowHalf />
            )}
          </FormItem>
        );
        break;
      case 'Slider':
        return (
          <FormItem label={item.label} {...formItemLayout}>
            {getFieldDecorator('row_' + index, {initialValue: item.value})(
              <Slider />
            )}
          </FormItem>
        );
        break;
      case 'Switch':
        return (
          <FormItem label={item.label} {...formItemLayout}>
            {getFieldDecorator('row_' + index, {initialValue: item.value})(
              <Switch />
            )}
          </FormItem>
        );
        break;
      case 'TimePicker':
        return (
          <FormItem label={item.label} {...formItemLayout}>
            {getFieldDecorator('row_' + index, {initialValue: item.value})(
              <TimePicker />
            )}
          </FormItem>
        );
        break;
      case 'Transfer':
        return (
          <FormItem label={item.label} {...formItemLayout}>
            {getFieldDecorator('row_' + index, {initialValue: item.value})(
              <TimePicker />
            )}
          </FormItem>
        );
        break;
      case 'TreeSelect':

        break;
      case 'Upload':
        const props = {
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
              message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
            }
          },
        };
        return (
          <FormItem label={item.label} {...formItemLayout}>
            {getFieldDecorator('row_' + index, {initialValue: item.value})(
              <Upload {...props}>
                <Button type="ghost">
                  <Icon type="upload" /> 点击上传
                </Button>
              </Upload>
            )}
          </FormItem>
        );
        break;
      default:
        break;

    }
  }

  isUpdateClick() {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      if (this.props.updateClick) {
        this.props.updateClick(values);
      }
    })
  }

  render() {
    if (this.state.isEditing) {
      return (
        <div>
          <Row>
            <Col offset={3}>
              <Form horizontal={true} style={{ maxWidth: 400 }}>
                {this.props.dataSource.map((item, index) =>
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
    } else {
      return (
        <div>
          {this.props.dataSource.map((item, index) =>
            (
              <Row key={'row_' + index}>
                <Col span={3} offset={3}>
                  <span>{item.label}:</span>
                </Col>
                <Col span={6}>
                  <span>{item.value}</span>
                </Col>
              </Row>
            ))}
          <Row>
            <Col offset={3}>
              <Button type="primary" onClick={() => this.updateClick()}>编辑</Button>
            </Col>
          </Row>
        </div>
      );
    }
  }

}
export default FormDetail = Form.create()(FormDetailD);


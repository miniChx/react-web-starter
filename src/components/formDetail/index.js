/**
 * Created by geweimin on 16/10/27.
 */
import React from 'react';
import { Form, Button, Row, Col, Input, InputNumber, Select, Cascader } from 'mxa';

/* eslint-disable */
let FormDetail;
const FormItem = Form.Item;
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
      case 'normal':
        return (
          <FormItem label={item.label} {...formItemLayout}>
            {getFieldDecorator('row_' + index, {initialValue: item.value})(
              <Input />
            )}
          </FormItem>
        );
        break;
      case 'number':
        return (
          <FormItem label={item.label} {...formItemLayout}>
            {getFieldDecorator('row_' + index, {initialValue: item.value})(
              <InputNumber min={1}/>
            )}
          </FormItem>
        );
        break;
      case 'select':
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
      case 'cascader':
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
      case 'Checkbox':
        break;
      case 'Cascader':
        break;
      case 'DatePicker':
        break;
      case 'Input':
        break;
      case 'InputNumber':
        break;
      case 'Radio':
        break;
      case 'Rate':
        break;
      case 'Select':
        break;
      case 'Slider':
        break;
      case 'Switch':
        break;
      case 'TimePicker':
        break;
      case 'Transfer':
        break;
      case 'TreeSelect':
        break;
      case 'Upload':
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


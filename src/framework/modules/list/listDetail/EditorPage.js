/**
 * Created by geweimin on 16/11/3.
 */
import React from 'react';
import {
  Form,
  Button,
  Row,
  Col,
  Input,
  InputNumber,
  Select,
  Cascader,
  Icon,
  Upload,
  TimePicker,
  Switch,
  Slider,
  Rate,
  Radio,
  DatePicker,
  Checkbox
} from 'mxa';
import moment from 'moment';
import { autobind } from 'core-decorators';
import FormItemType from '../../../constant/formItemType';
import { ExtendButton } from '../../../../components';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const format = 'YYYY/MM/DD';

class EditorPage extends React.Component {

  static propTypes = {
    onFinished: React.PropTypes.func.isRequired,
    dataSource: React.PropTypes.object.isRequired
  };

  @autobind
  _renderFormItem(item, index) {
    const { getFieldDecorator } = this.props.form;
    const detailResult = this.props.dataSource.detailResult || {};
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 14 }
    };
    switch (item.displayComponent.componentType) {
      case FormItemType.INPUT:
        return (
          <FormItem label={item.description} {...formItemLayout}>
            { getFieldDecorator('row_' + index, { initialValue: detailResult[item.name] })(<Input />) }
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
                    <Select.Option key={'select_' + i1} value={i}>{i}</Select.Option>
                  ))}
              </Select>
            )}
          </FormItem>
        );
      // TODO:需要有options传入  placeholder需要修改
      case FormItemType.CASCADER:
        return (
          <FormItem label={item.description} {...formItemLayout}>
            {getFieldDecorator('row_' + index, { initialValue: detailResult[item.name] })(
              <Cascader options={item.displayComponent.items} placeholder="请选择" />
            )}
          </FormItem>
        );
      // TODO: 根据后台数据创建
      case FormItemType.AUTOCOMPLETE:
        return null;
      // TODO:需要传入plainOptions 确认defaultValue的显示方式
      case FormItemType.CHECKBOX:
        return (
          <FormItem label={item.description} {...formItemLayout}>
            {getFieldDecorator('row_' + index, { initialValue: [detailResult[item.name]] })(
              <CheckboxGroup options={null} defaultValue={['Apple']} />
            )}
          </FormItem>
        );
      // TODO:日期要显示当前数据
      case FormItemType.DATEPICKER:
        return (
          <FormItem label={item.description} {...formItemLayout}>
            {getFieldDecorator('row_' + index, { initialValue: moment('2015/01/01', format) })(
              <DatePicker defaultValue={moment('2015/01/01', format)} format={format} />
            )}
          </FormItem>
        );
      // TODO: 根据后台数据创建
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
      // TODO: 根据后台数据创建
      case FormItemType.RATE:
        return (
          <FormItem label={item.description} {...formItemLayout}>
            {getFieldDecorator('row_' + index, { initialValue: detailResult[item.name] })(
              <Rate allowHalf={true} />
            )}
          </FormItem>
        );
      // TODO: 根据后台数据创建
      case FormItemType.SLIDER:
        return (
          <FormItem label={item.description} {...formItemLayout}>
            {getFieldDecorator('row_' + index, { initialValue: detailResult[item.name] })(
              <Slider />
            )}
          </FormItem>
        );
      // TODO: 根据后台数据创建
      case FormItemType.SWITCH:
        return (
          <FormItem label={item.description} {...formItemLayout}>
            {getFieldDecorator('row_' + index, { initialValue: detailResult[item.name] })(
              <Switch />
            )}
          </FormItem>
        );
      // TODO: 根据后台数据创建
      case FormItemType.TIMEPICKER:
        return (
          <FormItem label={item.description} {...formItemLayout}>
            {getFieldDecorator('row_' + index, { initialValue: detailResult[item.name] })(
              <TimePicker />
            )}
          </FormItem>
        );
      // TODO: 根据后台数据创建
      case FormItemType.TRANSFER:
        return (
          <FormItem label={item.description} {...formItemLayout}>
            {getFieldDecorator('row_' + index, { initialValue: detailResult[item.name] })(
              <TimePicker />
            )}
          </FormItem>
        );
      // TODO: 根据后台数据创建
      case FormItemType.TREESELECT:
        return null;
      // TODO: 根据后台数据创建
      case FormItemType.UPLOAD:
        return (
          <FormItem label={item.description} {...formItemLayout}>
            {getFieldDecorator('row_' + index, { initialValue: detailResult[item.name] })(
              <Upload>
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

  @autobind
  _updateClick() {
    this.props.form.validateFields((errors, values) => {
      console.log('edit result:' + values);
    });
  }

  render() {
    const record = {};
    return (
      <div>
        <Row type="flex" justify="center">
          <Col>
            <Form horizontal={true} style={{ maxWidth: 400 }}>
              {
                this.props.dataSource.fields.map((item, index) =>
                  (
                    <div key={'row_' + index}>
                      {this._renderFormItem(item, index)}
                    </div>
                  )
                )
              }
            </Form>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span="1">
            {
              this.props.dataSource.buttons.map(item => (
                <ExtendButton
                  type="button"
                  buttonProps={{ type: 'primary' }}
                  {...item}
                  key={item.buttonDescription}
                  record={record}
                />
              ))
            }
          </Col>
          <Col span="1" offset={2}>
            <Button type="ghost" onClick={() => this.props.onFinished && this.props.onFinished()}>取消</Button>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Form.create()(EditorPage);

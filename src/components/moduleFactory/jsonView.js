/**
 * Created by baoyinghai on 10/21/16.
 */
import React from 'react';
import { Form, Input, Button, Checkbox, notification } from 'mxa';
const FormItem = Form.Item;
import { addPage } from '../../actions/pages';
import { dispatch } from '../../service/DispatchService';

class JsonView extends React.Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    //const newPage = this.props.form.getFieldsValue();
    //newPage.comp = (<div> {newPage.comp}</div>);
    //dispatch(addPage(newPage));
    const jsonStr = this.props.form.getFieldsValue().jsonStr;
    try {
      this.props.saveAction && this.props.saveAction(JSON.parse(jsonStr));
    } catch(err){
      notification.open({
        message: 'exception',
        description: JSON.stringify('JSON 格式错误'),
      });
    }

  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>

        <FormItem
          label="jsonStr"
        >
          {getFieldDecorator('jsonStr', {initialValue: JSON.stringify(this.props.jsonStr,null, 4)})(
            <Input type="textarea" id="control-textarea" rows="20"/>
          )}
        </FormItem>

        <Button type="primary" htmlType="submit">Submit</Button>
      </Form>
    );
  }
}


export default Form.create()(JsonView);

/**
 * Created by baoyinghai on 10/20/16.
 */
import React from 'react';
import { Form, Input, Button, Checkbox } from 'mxa';
const FormItem = Form.Item;
import { addPage } from '../../actions/pages';
import { dispatch } from '../../service/DispatchService';

class CreateNewPage extends React.Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const newPage = this.props.form.getFieldsValue();
    newPage.comp = (<div> {newPage.comp}</div>);
    dispatch(addPage(newPage));
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          label="displayName"
        >
          {getFieldDecorator('displayName')(
            <Input placeholder="Please input the displayName" />
          )}
        </FormItem>


        <FormItem
          label="comp"
        >
          {getFieldDecorator('comp')(
            <Input placeholder="Please input the comp" />
          )}
        </FormItem>

        <FormItem
          label="pageCode"
        >
          {getFieldDecorator('pageCode')(
            <Input placeholder="Please input the pageCode" />
          )}
        </FormItem>


        <Button type="primary" htmlType="submit">Submit</Button>
      </Form>
    );
  }
}


export default Form.create()(CreateNewPage);

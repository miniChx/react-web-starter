/**
 * Created by baoyinghai on 10/21/16.
 */
import React from 'react';
import { Form, Input, Button, Checkbox } from 'mxa';
const FormItem = Form.Item;
import { resetMenu } from '../../actions/menu';
import { dispatch } from '../../service/DispatchService';
import * as CacheService from '../../service/CacheService';

class SetMenu extends React.Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    // dispatch(addPage(this.props.form.getFieldsValue()));
    const newMenuItem = this.props.form.getFieldsValue();
    newMenuItem.domainLink = 'page_container/' + newMenuItem.menuCode;
    const menu = CacheService.getMenu();
    if (this.props.type === 'root') {
      newMenuItem.displayName = menu.length;
      menu.push(newMenuItem);
    } else if (this.props.type === 'sub') {
      const tag = menu[this.props.position];
      if (!tag.subMenus) {
        tag.subMenus = [];
      }
      const displayName = tag.subMenus.length;
      newMenuItem.displayName = displayName;
      tag.subMenus.push(newMenuItem);
    }
    dispatch(resetMenu(menu));
    this.props.clear && this.props.clear();
    //  console.log('Received values of form:', this.props.form.getFieldsValue());
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    // menuCode === pageCode
    return (
      <Form onSubmit={this.handleSubmit}>

        <FormItem
          label="menuCode"
        >
          {getFieldDecorator('menuCode')(
            <Input placeholder="Please input the menuCode" />
          )}
        </FormItem>

        <FormItem
          label="menuValue"
        >
          {getFieldDecorator('menuValue')(
            <Input placeholder="Please input the menuValue" />
          )}
        </FormItem>


        <Button type="primary" htmlType="submit">Submit</Button>
      </Form>
    );
  }
}


export default Form.create()(SetMenu);

import React from 'react';
import { Row, Col, Menu, Icon, Switch, Form, Input, Button, BackTop } from 'mxa';

import ModalInput from './modalInput';

import appStyle from '../../framework/styles/views/app.less';

const FormItem = Form.Item;

// const { Link } = Anchor;

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class Tab extends React.Component {

  renderMenu() {
    return (
      <div>
        <Menu
          defaultOpenKeys={['sub1']}
          mode="inline"
          style={{ borderRight: '0px' }}
        >
          <SubMenu key="sub1" title={<span><Icon type="mail" /><span>合作方客户管理</span></span>}>
            <MenuItemGroup title="合作方客户管理">
              <Menu.Item key="1">合作方客户管理</Menu.Item>
              <Menu.Item key="2">合作方客户管理</Menu.Item>
            </MenuItemGroup>
            <MenuItemGroup title="合作方客户管理">
              <Menu.Item key="3">合作方客户管理</Menu.Item>
              <Menu.Item key="4">合作方客户管理</Menu.Item>
            </MenuItemGroup>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>合作方客户管理</span></span>}>
            <Menu.Item key="5">合作方客户管理</Menu.Item>
            <Menu.Item key="6">合作方客户管理</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">合作方客户管理</Menu.Item>
              <Menu.Item key="8">合作方客户管理</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" title={<span><Icon type="setting" /><span>合作方客户管理</span></span>}>
            <Menu.Item key="9">合作方客户管理</Menu.Item>
            <Menu.Item key="10">合作方客户管理</Menu.Item>
            <Menu.Item key="11">合作方客户管理</Menu.Item>
            <Menu.Item key="12">合作方客户管理</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }

  renderForm() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

    // To generate mock Form.Item
    const children = [];
    for (let i = 0; i < 10; i++) {
      children.push(
        <Col span={12} key={i}>
          <FormItem {...formItemLayout} label={`Field ${i}`}>
            {getFieldDecorator(`field-${i}`)(
              <Input placeholder="placeholder" />
            )}
          </FormItem>
        </Col>
      );
    }

    const shownCount = 6;
    return (
      <div className={appStyle.formBox}>
        <Form
          horizontal={true}
          className="ant-advanced-search-form"
        >
          <Row gutter={40} className={appStyle.cell}>
            {children.slice(0, shownCount)}
          </Row>
        </Form>
      </div>
    );
  }

  renderFormModal() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

    // To generate mock Form.Item
    const children = [];
    for (let i = 0; i < 10; i++) {
      children.push(
        <Col span={12} key={i}>
          <FormItem {...formItemLayout} label={`Field ${i}`}>
            {getFieldDecorator(`field-${i}`)(
              <ModalInput />
            )}
          </FormItem>
        </Col>
      );
    }

    const shownCount = 6;
    return (
      <div className={appStyle.formBox}>
        <Form
          horizontal={true}
          className="ant-advanced-search-form"
        >
          <Row gutter={40} className={appStyle.cell}>
            {children.slice(0, shownCount)}
          </Row>
        </Form>
      </div>
    );
  }

  renderMain() {
    return (
      <div className={appStyle.layoutContainerBody} >
        <h1>合作方客户管理</h1>
        <p>表单一定会包含表单域，表单域可以是输入控件，标准表单域，标签，下拉菜单，文本域等。这里我们封装了表单域</p>
        <h2><span>基本信息</span></h2>
        {this.renderFormModal()}
        <h2>证件信息</h2>
        {this.renderForm()}
        <h2>联系人信息</h2>
        {this.renderForm()}
        <h2>联系人信息</h2>
        {this.renderForm()}
        <h2><span>联系人信息</span></h2>
        {this.renderForm()}
        <h2>联系人信息</h2>
        {this.renderForm()}
      </div>
    );
  }

  // renderM() {
  //  return (
  //    <Anchor>
  //      <Link href="#components-anchor-demo-basic" title="Basic demo" />
  //      <Link href="#components-anchor-demo-fixed" title="Fixed demo" />
  //    </Anchor>
  //  );
  // }

  render() {
    return (
      <div>
        <Row>
          <Col span={4}>{this.renderMenu()}</Col>
          <Col span={18}>{this.renderMain()}</Col>
        </Row>
        <BackTop />
      </div>
    );
  }
}

export default Form.create()(Tab);

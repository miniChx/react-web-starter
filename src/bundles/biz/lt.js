/**
 * Created by baoyinghai on 11/27/16.
 */
import React from 'react';
import { Menu, Icon, Col, Row, Form, Input } from 'mxa';

import ModalInput from '../../components/modalInput';
import Layout, { AnHref } from '../../components/layout';
import appStyle from '../../framework/styles/views/app.less';
import Simple from '../../components/simpleMenu';
import { getMenu } from '../../framework/service/CacheService';

import SelectableModal from './SelectableModal';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;

class Lt extends React.Component {

  renderMenu() {
    return (<Simple menu={getMenu()} />);
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
              <ModalInput mapper={value => value + 'mapper'}>
                <SelectableModal />
              </ModalInput>
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

  render() {
    return (
      <Layout renderMenu={this.renderMenu}>
        <div className={appStyle.layoutContainerBody} >
          <h1>合作方客户管理</h1>
          <p>表单一定会包含表单域，表单域可以是输入控件，标准表单域，标签，下拉菜单，文本域等。这里我们封装了表单域</p>
          <h2>
            <AnHref title="基本信息1" href="#components-anchor-demo-basic1">
              <span>基本信息1<a href="#components-anchor-demo-basic1">#</a></span>
            </AnHref>
          </h2>
          {this.renderFormModal()}
          <h2>
            <AnHref title="证件信息2" href="#components-anchor-demo-basic2">
              <span>证件信息2<a href="#components-anchor-demo-basic2">#</a></span>
            </AnHref>
          </h2>
          {this.renderForm()}
          <h2>
            <AnHref title="联系人信息3" href="#components-anchor-demo-basic3">
              <span>联系人信息3<a href="#components-anchor-demo-basic3">#</a></span>
            </AnHref>
          </h2>
          {this.renderForm()}
          <h2>
            <AnHref title="联系人信息4" href="#components-anchor-demo-basic4">
              <span>联系人信息4<a href="#components-anchor-demo-basic4">#</a></span>
            </AnHref>
          </h2>
          {this.renderForm()}
          <h2>
            <AnHref title="联系人信息5" href="#components-anchor-demo-basic5">
              <span>联系人信息5<a href="#components-anchor-demo-basic5">#</a></span>
            </AnHref>
          </h2>
          {this.renderForm()}
          <h2>
            <AnHref title="联系人信息6" href="#components-anchor-demo-basic6">
              <span>联系人信息6<a href="#components-anchor-demo-basic6">#</a></span>
            </AnHref>
          </h2>
          {this.renderForm()}
        </div>
      </Layout>
    );
  }
}

export default Form.create()(Lt);

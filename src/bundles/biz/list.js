/**
 * Created by vison on 11/30/16.
 */
import React from 'react';
import { Icon, Col, Row, Form, Input } from 'antd';
import { autobind } from 'core-decorators';
import ModalInput from '../../components/modalInput';
import { ListView } from '../../framework/modules';
import appStyle from '../styles/views/app.less';
// import Simple from '../../components/simpleMenu';
import { getMenu } from '../../framework/service/CacheService';
// import { AnHref } from '../../framework/layout';

// const FormItem = Form.Item;

export default class Lt extends React.Component {

  render() {
    return (
      <div>
        <ListView {...this.props} />
      </div>
    );
  }
}

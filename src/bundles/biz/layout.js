/**
 * Created by baoyinghai on 11/27/16.
 */
import React from 'react';
import { Icon, Col, Row, Form, Input } from 'mxa';
import { autobind } from 'core-decorators';
import ModalInput from '../../components/modalInput';
import { ListDetail } from '../../framework/modules';
import appStyle from '../../framework/styles/views/app.less';
// import Simple from '../../components/simpleMenu';
import { getMenu } from '../../framework/service/CacheService';
import { AnHref } from '../../framework/layout';

const FormItem = Form.Item;

export default class Lt extends React.Component {

  render() {
    return (
      <div>
        <AnHref title="这是自己渲染的" href="#hahahaha" />
        <ListDetail {...this.props} />
      </div>
    );
  }
}

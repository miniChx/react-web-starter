/**
 * Created by baoyinghai on 11/27/16.
 */
import React from 'react';
import { Icon, Col, Row, Form, Input } from 'mxa';
import { autobind } from 'core-decorators';
import ModalInput from '../../components/modalInput';
import { Info } from '../../framework/modules';
import appStyle from '../../framework/styles/views/app.less';
// import Simple from '../../components/simpleMenu';
import { getSubMenu } from '../../framework/service/CacheService';
import { AnHref } from '../../framework/modules/info';

// const FormItem = Form.Item;

export default class Lt extends React.Component {

  @autobind
  renderMain(selectMenuItem, query) {
    console.log('######', selectMenuItem.domainLink + ', ' + selectMenuItem.domainType);
    return (
      <div>
        <AnHref title="这是自己渲染的" href="#hahahaha1" />
        <AnHref title="这是自己渲染的" href="#hahahaha2" />
        <AnHref title="这是自己渲染的" href="#hahahaha3" />
        <AnHref title="这是自己渲染的" href="#hahahaha4" />
      </div>
    );
  }
  // <Info {...this.props} renderBody={this.renderMain} />
  render() {
    return (
      <div>
        <Info {...this.props} />
      </div>
    );
  }
}

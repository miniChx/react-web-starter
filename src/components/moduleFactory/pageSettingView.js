/**
 * Created by baoyinghai on 10/21/16.
 */

import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'mxa';
const FormItem = Form.Item;
import { addPage, updatePage } from '../../actions/pages';
import { dispatch } from '../../service/DispatchService';
import { constructPreViewPage, constructPreViewPageAndElement } from '../../renderTools';
import JsonView from './jsonView';

class PageSettingView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: this.props.page,
      comp: null
    };
    this.showElementView = this.showElementView.bind(this);
    this.showLayoutView = this.showLayoutView.bind(this);
    this.saveLayout = this.saveLayout.bind(this);
    this.saveElement = this.saveElement.bind(this);
    this.updatePage = this.updatePage.bind(this);
  }

  updatePage() {
    dispatch(updatePage(this.state.page));
  }

  showLayoutView() {
    this.setState({
      comp: constructPreViewPage(this.state.page.layout),
      opt: 'layout'
    });
  }

  showElementView() {
    this.setState({
      comp: constructPreViewPageAndElement(this.state.page.layout, this.state.page.element),
      opt: 'element'
    });
  }

  saveLayout(layout) {
    this.setState({
      page: {...this.props.page, layout}
    }, () => {
      this.setState({
        comp: constructPreViewPage(this.state.page.layout),
      }, () => {
        this.updatePage();
      });
    });
  }

  saveElement(element) {
    this.setState({
      page: {...this.props.page, element}
    },() => {
      this.setState({
        comp: constructPreViewPageAndElement(this.state.page.layout, this.state.page.element),
      }, () => {
        this.updatePage();
      });
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={4}>
            <Button type="ghost" onClick={() => this.showLayoutView()}>布局</Button>
            <br />
            <Button type="ghost" onClick={() => this.showElementView()}>元素</Button>
          </Col>
          <Col span={20}>
            {this.state.comp}
            <div>
            {(() => {
              if (this.state.opt === 'layout') {
                return (
                  <JsonView jsonStr={this.state.page.layout} saveAction={this.saveLayout}/>
                );
              } else if (this.state.opt === 'element') {
                return (
                  <JsonView jsonStr={this.state.page.element} saveAction={this.saveElement}/>
                );
              }
              return null;
            })()}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PageSettingView;

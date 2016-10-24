/**
 * Created by baoyinghai on 10/20/16.
 */
import React from 'react';
import { Row, Col, Button } from 'mxa';
import { connect } from 'react-redux';

import Foo from '../Foo';
import SubPage from '../SubPage';
import CreateNewPage from './createNewPage';
import { constructPage } from '../../renderTools'
import PageSettingView from './pageSettingView';

class ModuleFactory extends React.Component {

  constructor(props) {
    super(props);
    this.renderToolsBar = this.renderToolsBar.bind(this);
    this.renderPageList = this.renderPageList.bind(this);
    this.renderWorkSpace = this.renderWorkSpace.bind(this);
    this.showPage = this.showPage.bind(this);
    this.createNewPage = this.createNewPage.bind(this);
    this.renderData = [
      [
        { span: 24, renderFuc: this.renderToolsBar}
      ], [
        {span: 4, renderFuc: this.renderPageList}, {span: 20, renderFuc: this.renderWorkSpace}
      ]
    ];
    this.state = {
      page: null
    }
  }

  createNewPage() {
    this.setState( {
      page: <CreateNewPage />
    });
  }

  showPage(page) {
   this.setState({page});
  }

  renderToolsBar() {
    return (
     <div>
       <Button type="ghost" key="create_page" onClick={() => this.createNewPage()} >创建新的页面</Button>
     </div>
    );
  }

  renderPageList() {
    return (
      <div>
        {
          this.props.pages && this.props.pages.map(page => {
            return (
              <div key={page.id} >
                <Button type="ghost" onClick={() => this.showPage(page)} >
                  {page.displayName}
                </Button>
                <br />
              </div>
            );
          })
        }
      </div>
    );

  }

  renderWorkSpace() {
    if (this.state.page) {
      if (this.state.page.layout) {
        // return constructPage(this.state.page.layout, this.state.page.element);
        return (
          <PageSettingView page={this.state.page} />
        );
      }
      return this.state.page;
    }
    return (
      <span> please choose page </span>
    );
  }

  render() {
    return (
      <div>
        {this.renderData.map((rows, index) => (
          <Row key={'row_' + index} gutter={16} >{
           rows && rows.map((col, i) => {
             return (
               <Col key={'row_' + index + 'col_' + i} span={col.span}>{col.renderFuc && col.renderFuc()} </Col>
             );
          })
          }</Row>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pages: state.pages,
});

export default connect(mapStateToProps)(ModuleFactory);

/**
 * Created by baoyinghai on 10/21/16.
 */
import React from 'react';
import { getPages } from '../service/CacheService';
import { Row, Col, Button } from 'mxa';
import { constructPage } from '../renderTools'

class PageContainer extends React.Component {

  constructor(props) {
    super(props);
    const pages = getPages();
    // TODO: create your wraper
    this.tag = null;
    pages && pages.forEach((p) => {
      if (p.pageCode === this.props.params.id) {
        if(p.layout) {
          this.tag = constructPage(p.layout, p.element);
        } else {
          this.tag = p.comp;
        }
      }
    });
  }

  render() {
    return (
      <div>{this.tag}</div>
    );
  }
}

export default PageContainer;

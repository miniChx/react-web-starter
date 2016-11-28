/**
 * Created by baoyinghai on 11/27/16.
 */
import React from 'react';
import { Row, Col, Menu, Icon, Input, BackTop, Affix } from 'mxa';
import Anchor, { ArchorLink } from '../../components/anchor';
import AnchorHref from './anchorHref';

export default class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.anchor = [];
  }

  renderMenu() {
    return this.props.renderMenu();
  }

  searchAnchor(children) {
    if (typeof children === 'object') {
      if (children instanceof Array) {
        children.some(c => this.searchAnchor(c));
      } else if (children && children.type && children.type.defaultProps && children.type.defaultProps.name === 'AnchorHref') {
        this.anchor.push({ title: children.props.title, href: children.props.href });
      } else if (children.props.children) {
        this.searchAnchor(children.props.children);
      }
    }
  }

  render() {
    this.anchor = [];
    this.searchAnchor(this.props.children);
    return (
      <div>
        <Row>
          <Col span={4}>{this.renderMenu()}</Col>
          <Col span={18}>{this.props.children}</Col>
          <Col span={2}>
            <Anchor>
              {this.anchor.map(p => (<ArchorLink key={p.href} {...p} />))}
            </Anchor>
          </Col>
        </Row>
        <BackTop />
      </div>
    );
  }
}

export const AnHref = AnchorHref;

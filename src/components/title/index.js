/**
 * Created by baoyinghai on 10/19/16.
 */
import React from 'react';
import { Icon, Col, Row } from 'mxa';
import { dispatch } from '../../service/DispatchService';
import { logout } from '../../actions/session';

/* eslint-disable */
export default class Title extends React.Component {

  constructor(props) {
    super(props);
    this._logout = this._logout.bind(this);
  }

  _logout() {
    dispatch(logout());
  }

  render() {
    return (
      <Row>
        <Col span={12}>
          <h1>快速开发基础平台</h1>
        </Col>
        <Col span={2} offset={10}>
          <span style={{cursor:'pointer'}} onClick={this._logout}>
            <Icon type="logout"/>{' 退出'}
          </span>
        </Col>
      </Row>
    );
  }

}

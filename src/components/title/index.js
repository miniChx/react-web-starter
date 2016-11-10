/**
 * Created by baoyinghai on 10/19/16.
 */
import React from 'react';
import { Icon, Col, Row } from 'mxa';
import { dispatch } from '../../service/DispatchService';
import { logout } from '../../actions/global';
import styles from '../../styles/views/title.less';
/* eslint-disable */
export default class Title extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: true
    }
    this._logout = this._logout.bind(this);
    this._switchMenu = this._switchMenu.bind(this)
  }

  _logout() {
    dispatch(logout());
  }

  _switchMenu() {
    if (this.props.switchMenu) {
      this.props.switchMenu();
    }
  }

  render() {
    return (
      <Row className={styles.titleContainer} type="flex" align="middle">
        <Col span={1}>
          <Icon type="bars" className={styles.titleIcon} onClick={this._switchMenu}/>
        </Col>
        <Col span={8} offset={7}>
          <h1 className={styles.title_color}>快速开发基础平台</h1>
        </Col>
        <Col span={2} offset={6}>
          <span className={styles.title_color} style={{cursor:'pointer'}} onClick={this._logout}>
            <Icon type="logout" className={styles.title_color} />{' 退出'}
          </span>
        </Col>
      </Row>
    );
  }

}

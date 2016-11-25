/**
 * Created by baoyinghai on 10/19/16.
 */
import React from 'react';
import { Icon, Col, Row, Button } from 'mxa';
import { replace } from 'react-router-redux';
import { dispatch } from '../../framework/service/DispatchService';
import { logout, loginServer } from '../../framework/actions/global';
import styles from '../../framework/styles/views/title.less';
import { longRunExec } from '../../framework/system/longRunOpt';
import Menu from '../menu';

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
    dispatch(logout())
  }

  _switchMenu() {
    if (this.props.switchMenu) {
      this.props.switchMenu();
    }
  }

  render() {
    return (
      <Row className={styles.titleContainer} type="flex" align="middle">
        <Col span={4}>
          <h1 className={styles.title_color}>基础开发平台</h1>
        </Col>
        <Col span={10} offset={8}>
         <Menu />
        </Col>
        <Col span={2} offset={0}>
          <Button type="ghost" onClick={this._logout} size="small" >
            <Icon type="logout" />
          </Button>
        </Col>
      </Row>
    );
  }

}

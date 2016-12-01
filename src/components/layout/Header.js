
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon, Col, Row, Button } from 'mxa';
import { logout } from '../../framework/actions/global';
import styles from '../../framework/styles/views/app.less';
import Menu from './Menu';

class Header extends React.Component {
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
          <Button
            type="ghost"
            size="small"
            onClick={() => this.props.actions.logout()}
          >
            <Icon type="logout" />
          </Button>
        </Col>
      </Row>
    );
  }
}

// eslint-disable-next-line arrow-body-style
const mapDispatchToProps = () => dispatch => ({
  actions: {
    ...bindActionCreators({
      logout,
    }, dispatch)
  }
});
export default connect(null, mapDispatchToProps)(Header);

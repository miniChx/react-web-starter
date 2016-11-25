import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { autobind } from 'core-decorators';
import District from '../../../components/district';

import styles from '../../styles/views/home.less';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    // initial state
    this.state = {
      province: '',
      municipality: '',
      district: '',
    };
  }

  @autobind
  _onChange(province, municipality, district) {
    this.setState({ province, municipality, district });
  }

  render() {
    return (
      <div className="home">
        <div className={styles.jump}>
          <a onClick={() => this.props.dispatch(push('/page_container/AccountList/render'))}>跳转到用户管理</a>
        </div>
        <div className={styles.district}>
          <District onChange={this._onChange} />
          <div>{'省： ' + this.state.province}</div>
          <div>{'市： ' + this.state.municipality}</div>
          <div>{'区： ' + this.state.district}</div>
        </div>
      </div>
    );
  }
}

export default connect()(Home);

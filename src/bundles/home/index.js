import React from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { District } from '../../components';

import styles from '../styles/views/home.less';

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
        <div className={styles.district}>
          <District onChange={this._onChange} width={150} />
          <div>{'省： ' + this.state.province}</div>
          <div>{'市： ' + this.state.municipality}</div>
          <div>{'区： ' + this.state.district}</div>
        </div>
      </div>
    );
  }
}

export default connect()(Home);

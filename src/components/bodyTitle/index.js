/**
 * Created by vison on 12/26/16.
 */
import React from 'react';
import { Icon } from 'antd';
import styles from '../../bundles/styles/views/app.less';

export default class BodyTitle extends React.Component {

  render() {
    if (this.props.title) {
      return (
        <div className={styles.bodyTitle}>{this.props.title}<Icon className={styles.icon} type="appstore" /></div>
      );
    }
    return null;
  }
}

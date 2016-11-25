/**
 * Created by baoyinghai on 11/25/16.
 */
import React from 'react';
import { Affix } from 'mxa';
import styles from '../../framework/styles/views/anchor.less';
import Link from './Link';

export default class Anchor extends React.Component {
  render() {
    return (
      <Affix>
        <ul className={styles.container}>
          {this.props.children}
        </ul>
      </Affix>
    );
  }
}

export const ArchorLink = Link;


/**
 * Created by baoyinghai on 11/25/16.
 */
import React from 'react';
import styles from '../../framework/styles/views/anchor.less';

export default class Link extends React.Component {

  constructor(props) {
    super(props);
    this.linkClick = this.linkClick.bind(this);
  }

  linkClick(e) {
    e.preventDefault();
    const anchorLink = document.querySelector("a[href='" + this.props.href + "']");
    if (window.scrollTo) {
      window.scrollTo({ behavior: 'smooth', top: anchorLink.offsetTop });
    }
  }

  render() {
    return (
      <li className={styles.anchor}> <span onClick={this.linkClick} title={this.props.title}>{this.props.title.length > 7 ? this.props.title.substring(0, 7) + '...' : this.props.title}</span></li>
    );
  }
}

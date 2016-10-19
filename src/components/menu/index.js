/**
 * Created by baoyinghai on 10/18/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import styles from '../../styles/views/cps.less';


export default class Menu extends React.Component {

  constructor(props){
    super(props);
    this.showHidenMenu = this.showHidenMenu.bind(this);
    this.hiddenMenu = this.hiddenMenu.bind(this);
    this.onClickV = this.onClickV.bind(this);
    this.state = {
      subMenu: [styles.mxMenuItemSubmenu, styles.mxMenuHidden],
      subV: [ styles.mxMenuHidden],
      subVStatus: false
    }
  }

  showHidenMenu() {
    this.setState({subMenu: [styles.mxMenuItemSubmenu, styles.mxMenuOpen, styles.mxMenuVertical]});
  }

  hiddenMenu() {
    this.setState({subMenu: [styles.mxMenuItemSubmenu, styles.mxMenuHidden]});
  }

  onClickV() {
    if (this.state.subVStatus) {
      this.setState({ subV: [styles.mxMenuHidden], subVStatus: false });
    } else {
      this.setState({ subV: [styles.mxMenuOpen], subVStatus: true });
    }
  }

  render() {
    // 水平
    //return (
    //  <div className={styles.mxMenuContainer}>
    //    <ul className={styles.mxMenu} >
    //      <li className={[styles.mxMenuItem].join(' ')} >navigator one</li>
    //      <li className={[styles.mxMenuItem].join(' ')} >navigator two</li>
    //      <li className={styles.mxMenuItem} onMouseOver={this.showHidenMenu} onMouseLeave={this.hiddenMenu} >
    //        <span>navigator three</span>
    //        <ul className={this.state.subMenu.join(' ')} >
    //          <li className={styles.mxMenuVerticalItem} >option1</li>
    //          <li className={styles.mxMenuVerticalItem} >option2</li>
    //        </ul>
    //      </li>
    //      <li className={styles.mxMenuItem} >navigator four</li>
    //    </ul>
    //  </div>
    //);


    //垂直
    return (
      <div>
        <ul className={styles.mxMenuV}  >
          <li className={styles.mxMenuSubInline} onClick={this.onClickV} >
            <span>navigator one </span>
            <ul className={this.state.subV.join(' ')} >
              <li className={styles.mxMenuVerticalItem}>item 1</li>
              <li className={styles.mxMenuVerticalItem}>item 2</li>
            </ul>
          </li>
          <li className={styles.mxMenuSubInline} >navigator two</li>
          <li className={styles.mxMenuSubInline} >navigator three</li>
        </ul>
      </div>
    );


  }
}

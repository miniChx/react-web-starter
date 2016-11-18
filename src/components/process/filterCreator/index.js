/**
 * Created by baoyinghai on 11/10/16.
 */
import React from 'react';
import { Button, Collapse } from 'mxa';
import { autobind } from 'core-decorators';

import filterCreator from './analysers';
import styles from '../../../styles/views/listview.less';
import { clearParam, getParam } from './filterParam';
import { PFetch } from '../../../system/fetch';

const Panel = Collapse.Panel;

export default class FilterBar extends React.Component {

  constructor(props) {
    super(props);
    clearParam();
  }

  @autobind
  filterData() {
    const param = getParam();
    const urlAry = this.props.domainLink.split('/');
    urlAry.pop();
    urlAry.push('search');
    const searchUrl = urlAry.join('/');
    console.log(searchUrl);
    this.props.exec(() => {
      return PFetch('/' + searchUrl, param).then(response => {
        console.log(response);
      });
    });
  }

  @autobind
  _renderTopButtons() {
    const record = {};
    return (
      <div>
        <Button
          type="button"
          className={styles.topButton}
          onClick={this.filterData}
        >
          筛选
        </Button>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.filterContainer}>
        <Collapse>
          <Panel header="筛选条件" key="1">
            {this.props.data && this.props.data.map((item, index) => filterCreator(item.displayStyle)(item))}
            {this._renderTopButtons()}
          </Panel>
        </Collapse>
      </div>
    );
  }
}

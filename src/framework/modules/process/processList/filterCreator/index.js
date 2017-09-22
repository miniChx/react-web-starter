/**
 * Created by vison on 11/10/16.
 */
import React from 'react';
import { Button, Collapse } from 'antd';
import { autobind } from 'core-decorators';

import filterCreator from './analysers';
import styles from '../../../../styles/views/listview.less';
import { clearParam, getParam } from './filterParam';
import { PFetch } from '../../../../system/fetch';

const Panel = Collapse.Panel;

export default class FilterBar extends React.Component {

  constructor(props) {
    super(props);
    clearParam();
  }

  @autobind
  _renderTopButtons() {
    const record = {};
    return (
      <div>
        <Button
          type="button"
          className={styles.topButton}
          onClick={this.props.filterData}
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

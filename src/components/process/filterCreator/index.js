/**
 * Created by baoyinghai on 11/10/16.
 */
import React from 'react';
import { Button } from 'mxa';
import { autobind } from 'core-decorators';

import filterCreator from './FilterDisplayStyleAnalyser';
import styles from '../../../styles/views/listview.less';

export default class FilterBar extends React.Component {

  @autobind
  _renderTopButtons() {
    const record = {};
    return (
      <div>
        <Button
          type="button"
          buttonProps={{
            type: 'ghost',
          }}
          record={record}
          className={styles.topButton}
        >
          筛选
        </Button>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.props.data && this.props.data.map((item, index) => filterCreator(item.displayStyle)(item))}
        {this._renderTopButtons()}
      </div>
    );
  }
}

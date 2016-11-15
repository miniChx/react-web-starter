/**
 * Created by cui on 16/11/14.
 */
/* eslint-disable */
import React from 'react';
import { Tree } from 'mxa';

import GetMenus from './getMenus';
import GetButtons from './getButtons';

export default class roleAuthentication extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.mode === 'menu') {
      return (
        <div>
          <GetMenus />
        </div>
      );
    } else if (this.props.mode === 'button') {
      return (
        <div>
          <GetButtons />
        </div>
      );
    }
    return null;
  }

}

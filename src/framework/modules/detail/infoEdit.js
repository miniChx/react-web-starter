/**
 * Created by baoyinghai on 11/30/16.
 */

import React from 'react';
import Main from './main';

export default class InfoEdit extends React.Component {

  render() {
    return (
      <Main model="edit" {...this.props} />
    );
  }
}

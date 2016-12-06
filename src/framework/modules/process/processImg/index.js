/**
 * Created by baoyinghai on 11/18/16.
 */
import React from 'react';
import Config from '../../../../config';

const IFrame = require('react-iframe');

export default class ProcessImg extends React.Component {
  render() {
    // console.log('img source url', this.props.params.imgUrl || this.props.query.imgUrl);
    const imgUrl = this.props.params.imgUrl || this.props.query.imgUrl;
    return (
      <IFrame url={Config.ProcessPath + '/' + imgUrl} />
    );
  }
}

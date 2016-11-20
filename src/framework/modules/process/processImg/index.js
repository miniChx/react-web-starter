/**
 * Created by baoyinghai on 11/18/16.
 */
import React from 'react';
import Config from '../../../../config';

export default class ProcessImg extends React.Component {
  render() {
    console.log(this.props.params.imgUrl);
    return (
      <img src={Config.host + '/' + this.props.params.imgUrl} alt="Smiley face" />
    );
  }
}

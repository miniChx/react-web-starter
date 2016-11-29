/**
 * Created by baoyinghai on 11/27/16.
 */
import React from 'react';

export default class AnchorHref extends React.Component {
  static defaultProps = {
    name: 'AnchorHref'
  };

  /* eslint-disable */
  static propTypes = {
    href: React.PropTypes.string,
    title: React.PropTypes.string,
  };

  render() {
    if (this.props.children) {
      return (<span className="anchorTag">{this.props.children}</span>);
    }
    return (<span className="anchorTag">{this.props.title}<a href={this.props.href}>#</a></span>);

  }
}

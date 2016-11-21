/**
 * Created by baoyinghai on 10/25/16.
 */
import React from 'react';
import { autobind } from 'core-decorators';
import EditorPage from './EditorPage';
import InfoPage from './InfoPage';

export default class ListDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }

  @autobind
  switchPage() {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  render() {
    if (this.props.dataSource) {
      if (this.state.isEditing) {
        return (
          <EditorPage onFinished={this.switchPage} dataSource={this.props.dataSource} />
        );
      }
      return (
        <InfoPage onEdit={this.switchPage} dataSource={this.props.dataSource} />
      );
    }
    return null;
  }
}

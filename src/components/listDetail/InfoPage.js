/**
 * Created by geweimin on 16/11/3.
 */

import React from 'react';
import {
  Row,
  Col,
  Button
} from 'mxa';

export default class InfoPage extends React.Component {

  static propTypes = {
    onEdit: React.PropTypes.func.isRequired,
    dataSource: React.PropTypes.object.isRequired
  };

  render() {
    if (!this.props.dataSource) {
      return null;
    }
    return (
      <div>
        {
          this.props.dataSource.fields.map((item, index) =>
            (
              <Row key={'row_' + index}>
                <Col span={4} offset={8}>
                  <span>{item.description}:</span>
                </Col>
                <Col offset={2} span={10}>
                  <span>{this.props.dataSource.detailResult[item.name]}</span>
                </Col>
              </Row>
            )
          )
        }
        <Row type="flex" justify="center">
          <Col>
            <Button type="primary" onClick={() => this.props.onEdit && this.props.onEdit()}>编辑</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

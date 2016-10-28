/**
 * Created by baoyinghai on 10/25/16.
 */
import React from 'react';
import { Button, Row, Col } from 'mxa';

export default class ListDetail extends React.Component {

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    const record = this.props.state().record;
    const columns = this.props.state().columns;
    const data = Object.keys(record).map(key => {
      const c = columns && columns.filter(col => col.key === key);
      return { label: c && c[0] && c[0].title, value: record[key] };
    });
    this.state = {
      data
    };
  }

  goBack() {
    this.props.goBack();
  }

  render() {
    return (
      <div>
        {this.state.data.map((item, index) =>
          (
            <Row key={'row_' + index}>
              <Col span={6}>
                <span>{item.label}</span>
              </Col>
              <Col span={6}>
                <span>{item.value}</span>
              </Col>
            </Row>
          ))}

        <Button type="ghost" onClick={() => this.goBack()} >返回</Button>
      </div>
    );
  }
}

/**
 * Created by baoyinghai on 1/5/17.
 */
import React from 'react';
import { Timeline, Icon, Row, Col, Button } from 'mxa';

export default class Fxpg extends React.Component {

  render() {
    return (
      <div>
        <Timeline>
          <Timeline.Item dot={<Icon type="check-circle" style={{ fontSize: '16px', color: '#94C633' }} />}>
            <span style={{ backgroundColor: '#DAEDD2' }}>解除黑名单申请详情完整性检查</span>
          </Timeline.Item>
          <Timeline.Item>解除黑名单申请详情完整性检查通过</Timeline.Item>
          <Timeline.Item dot={<Icon type="check-circle" style={{ fontSize: '16px', color: '#94C633' }} />}>
            <span style={{ backgroundColor: '#DAEDD2' }}>签署意见完整性检查</span>
          </Timeline.Item>
          <Timeline.Item> 签署意见完整性检查通过</Timeline.Item>
        </Timeline>
        <Row>
          <Col span="12" style={{ color: '#94C633' }}>最终检查结果: 通过</Col>
          <Col span="12" style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button type="primary">重新检查</Button>
            <Button type="primary">确定</Button>
            <Button>取消</Button>
          </Col>
        </Row>
      </div>
    );
  }
}


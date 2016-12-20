/* eslint-disable no-console */

import React from 'react';
import { Row, Col } from 'mxa';

import styles from '../../bundles/styles/views/app.less';

class Footer extends React.Component {
  render() {
    return (
      <div className={styles.appFooter} >
        <Row type="flex" align="top" justify="center">
          <Col span={5} offset={1}>
            <div>
              <h2>GitHub</h2>
            </div>
            <div>仓库</div>
            <div>dva - 应用框架</div>
            <div>dva-clidva-cli -脚手架</div>
            <div>ant-toolant-tool - 开发工具</div>
          </Col>
          <Col span={5} offset={1}>
            <div>
              <h2>相关站点</h2>
              <div>Ant Design Mobile - 移动版</div>
              <div>G2G2 - 数据可视化</div>
              <div>AntVAntV - 数据可视化规范</div>
              <div>Ant Motion - 设计动效</div>
              <div>AntD Library - Axure 部件库</div>
              <div>Ant UX - 页面逻辑素材</div>
            </div>
          </Col>
          <Col span={5} offset={1}>
            <div>
              <h2>社区</h2>
            </div>
            <div>更新记录</div>
            <div>反馈和建议</div>
            <div>讨论</div>
            <div>报告 Bug</div>
          </Col>
          <Col span={5} offset={1}>
            <div>
              <h2>资管部出品</h2>
            </div>
            <div>Powered by Mxa</div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Footer;

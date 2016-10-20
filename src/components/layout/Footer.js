import React from 'react';
import { version as mxaVersion } from 'mxa/package.json';

// eslint-disable-next-line react/prefer-stateless-function
class Footer extends React.Component {
  render() {
    return (
      <footer id="footer">
        <ul>
          <li>
            <h2>说明</h2>
            <div>This starter boilerplate is build with React and Redux.</div>
          </li>
          <li>
            <div>©2016 武汉安硕织信网络科技有限公司</div>
            <div>mx 团队技术支持</div>
            <div>文档版本：{mxaVersion}</div>
          </li>
        </ul>
      </footer>
    );
  }
}

export default Footer;

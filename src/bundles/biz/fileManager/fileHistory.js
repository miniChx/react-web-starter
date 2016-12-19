/**
 * Created by baoyinghai on 12/16/16.
 */
import React from 'react';
import { Table, Icon } from 'mxa';
import moment from 'moment';
import appStyle from '../../../framework/styles/views/fileManager.less';
import Config from '../../../config';
import Links from '../../constant/links';

const numeral = require('numeral');

export default class FileHistory extends React.Component {

  dataAdapter(dataSource) {
    const ret = {};
    ret.columns = [
      {
        title: '版本',
        dataIndex: 'fileVersion',
        key: 'fileVersion',
      },
      {
        title: '上传时间',
        dataIndex: 'uploadTime',
        key: 'uploadTime',
        render: text => moment(text).format('YYYY-MM-DD hh:mm:ss')
      },
      {
        title: '文件大小',
        dataIndex: 'fileSize',
        key: 'fileSize',
        render: text => numeral(text).format('0,0') + ' KB'
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record, index) => (
          <span>
            <a href={Config.Host + Links.downloadFile + '?' + record.fileId}>下载</a>
            <span className="mx-divider" />
            <a href={'http://localhost:3003/ViewerJS/#../' + Links.downloadFile + '?' + record.fileId} target="_blank" rel="noopener noreferrer">预览</a>
          </span>)
      }
    ];
    ret.data = dataSource;
    return ret;
  }

  render() {
    const { data, columns } = this.dataAdapter(this.props.dataSource);
    return (
      <div className={appStyle.container}>
        <span>{ this.props.docmentName + '的历史版本'}</span>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

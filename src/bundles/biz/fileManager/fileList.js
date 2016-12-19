/**
 * Created by baoyinghai on 12/16/16.
 */
import React from 'react';
import { Table, Icon, Modal } from 'mxa';
import moment from 'moment';
import { autobind } from 'core-decorators';
import { showComponent } from '../../../components/mask';
import FileHistory from './fileHistory';
import Links from '../../constant/links';
import Config from '../../../config';

const numeral = require('numeral');

export default class FileList extends React.Component {

  renderColumn(value, record, index, name) {
    let text = value;
    if (name === 'docNessary') {
      if (text === 'Y') {
        return (
          <span>必需</span>
        );
      }
      return (
        <span>可选</span>
      );
    } else if (name === 'fileSize') {
      text = numeral(text).format('0,0') + ' KB';
    } else if (name === 'uploadTime') {
      text = moment(record.uploadTime).format('YYYY-MM-DD hh:mm:ss');
    }
    return (
      <span>{text}</span>
    );
  }

  @autobind
  showHistory(e, record) {
    this.props.exec && this.props.exec(() => {
      return this.props.fetch(Links.viewHistory, { documentId: record.documentId }).then(data => {
        console.log(record);
        showComponent((<FileHistory />), { dataSource: data, ...record });
      });
    });
  }

  dataAdapter(data) {
    const ret = {
      data: [],
      columns: []
    };
    if (this.props.dataSource && this.props.dataSource.pageResult && this.props.dataSource.pageResult.contentList) {
      ret.data = this.props.dataSource.pageResult.contentList;
    }
    if (this.props.dataSource && this.props.dataSource.fields) {
      ret.columns = this.props.dataSource.fields.filter(f => f.isVisible).map(field => {
        return {
          title: field.description,
          dataIndex: field.name,
          key: field.name,
          render: (text, record, index) => this.renderColumn(text, record, index, field.name)
        };
      });
    }
    ret.columns.push(
      {
        title: '操作',
        key: 'action',
        render: (text, record, index) => (
          <span>
            <a href={Config.Host + Links.downloadFile + '?' + record.fileId}>下载</a>
            <span className="mx-divider" />
            <a onClick={e => this.showHistory(e, record)}>查看历史版本</a>
            {this.renderDelete(text, record, index)}
          </span>)
      }
    );
    return ret;
  }

  @autobind
  deleteFile(e, record) {
    this.props.exec && this.props.exec(() => {
      return this.props.fetch(Links.deleteFile, record).then(data => {
        Modal.info({
          title: '提示',
          content: (<div>删除成功！</div>),
          onOk: null
        });
        this.props.freshListData(record, 'DELETE');
      });
    });
  }

  @autobind
  renderDelete(text, record, index) {
    if (record && record.docNessary && record.docNessary !== 'Y') {
      return (
        <span>
          <span className="mx-divider" />
          <a onClick={e => Modal.info({ title: '提示', content: (<div>确定删除文件{record.docmentName}吗?</div>), onOk: () => this.deleteFile(e, record) })}>删除</a>
        </span>
      );
    }
    return null;
  }

  render() {
    const { data, columns } = this.dataAdapter(this.props.dataSource);
    return (
      <Table columns={columns} dataSource={data} />
    );
  }
}

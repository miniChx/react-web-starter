/**
 * Created by baoyinghai on 12/15/16.
 */
import React from 'react';
import { autobind } from 'core-decorators';
import { message, Button, Icon, Table } from 'mxa';
import Config from '../../../config';
import { ListView } from '../../../framework/modules';
import UploadBtn, { FileList } from './uploadBtn';

export default class FileManager extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: this.props.dataSource
    };
  }

  initFileType(list) {
    const ret = [];
    list.forEach(record => {
      ret.push({ code: record.documentId, value: record.docmentName, docNessary: record.docNessary });
    });
    ret.push({ code: 'NEW', value: '新增', docNessary: 'N' });
    console.log('*** select code ***', ret);
    return ret;
  }

  @autobind
  onChange(info) {
    console.log(info);
  }

  @autobind
  onRowSelected(data) {
    this.setState({});
  }

  @autobind
  freshListData(record, actionType) {
    const dataSource = this.props.dataSource;
    if (!dataSource.pageResult.contentList.some((r, index) => {
      if (r.documentId === record.documentId) {
        console.log('get', r);
        if (actionType === 'DELETE') {
          dataSource.pageResult.contentList = dataSource.pageResult.contentList.slice(0, index).concat(dataSource.pageResult.contentList.slice(index + 1, dataSource.pageResult.contentList.length));
        } else {
          dataSource.pageResult.contentList[index] = record;
        }
        return true;
      }
      return false;
    })) {
      dataSource.pageResult.contentList.push(record);
    }
    console.log(dataSource);
    this.setState({ dataSource });
  }

  render() {
    const fileType = this.initFileType(this.props.dataSource && this.props.dataSource.pageResult && this.props.dataSource.pageResult.contentList);
    return (
      <div>
        <UploadBtn freshListData={this.freshListData} fetch={this.props.fetch} onChange={this.onChange} fileType={fileType} />
        <FileList {...this.props} freshListData={this.freshListData} dataSource={this.state.dataSource} />
      </div>
    );
  }
}

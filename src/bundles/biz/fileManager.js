/**
 * Created by baoyinghai on 12/15/16.
 */
import React from 'react';
import { autobind } from 'core-decorators';
import { message, Button, Icon, Table } from 'mxa';
import Config from '../../config';
import { ListView } from '../../framework/modules';
import UploadBtn, { FileList } from '../../components/upload';

export default class FileManager extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fileType: this.initFileType(this.props.dataSource && this.props.dataSource.pageResult && this.props.dataSource.pageResult.contentList),
      dataSource: this.props.dataSource
    };
  }

  initFileType(list) {
    const ret = [];
    list.forEach(record => {
      ret.push({ code: record.serialNo, value: record.needUploadDocName, docNessary: record.docNessary });
    });
    ret.push({ code: 'NEW', value: '新增', docNessary: 'N' });
    console.log(ret);
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
  freshListData(record) {
    const dataSource = this.props.dataSource;
    if (!dataSource.pageResult.contentList.some((r, index) => {
      if (r.serialNo === record.serialNo) {
        console.log('get', r);
        dataSource.pageResult.contentList[index] = record;
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
    return (
      <div>
        <UploadBtn freshListData={this.freshListData} fetch={this.props.fetch} onChange={this.onChange} fileType={this.state.fileType} />
        <FileList {...this.props} dataSource={this.state.dataSource} />
      </div>
    );
  }
}

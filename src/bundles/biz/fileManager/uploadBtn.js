/**
 * Created by baoyinghai on 12/15/16.
 */
import React from 'react';
import { autobind } from 'core-decorators';
import { Upload, message, Button, Icon, Table } from 'mxa';
import { showComponent } from '../../../components/mask';
import Dialog from './dialog';

export default class UploadHelper extends React.Component {

  @autobind
  onChange(info) {
    if (info.file.status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      this.props.onChange && this.props.onChange(info.file.response);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  render() {
    const event = {
      onClick: e => {
        console.log('click me', this.props.fileType);
        showComponent((<Dialog />), { onChange: this.onChange, fileType: this.props.fileType, fetch: this.props.fetch, freshListData: this.props.freshListData });
      }
    };

    return (
      <Button {...event} >上传文件</Button>
    );
  }
}

export { default as FileList } from './fileList';

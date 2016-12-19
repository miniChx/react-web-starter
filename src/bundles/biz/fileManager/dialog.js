/**
 * Created by baoyinghai on 12/15/16.
 */
import React from 'react';
import { Upload, message, Button, Icon, Table, Form, Input, Select } from 'mxa';
import { autobind } from 'core-decorators';
import Links from '../../constant/links';
import Config from '../../../config';

import appStyle from '../../../framework/styles/views/fileManager.less';

const FormItem = Form.Item;

class Dialog extends React.Component {

  static defaultProps = {
    // showUploadList: true,
    name: 'file',
    action: Config.Host + Links.uploadFile,
    headers: {
      authorization: 'authorization-text',
    },
    // accept: ['pdf'],
  };

  @autobind
  isDoNessary(code) {
    if (code === 'NEW') {
      return { documentId: null, docmentName: null, docNessary: 'N' };
    }
    const { fileType } = this.props;
    const tag = fileType && fileType.filter(f => f.code === code);
    if (tag && tag[0]) {
      return { documentId: tag[0].code, docmentName: tag[0].value, docNessary: tag[0].docNessary };
    }
    return { documentId: null, docmentName: null, docNessary: 'N' };
  }

  @autobind
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // const params = {documentId, needUploadDocName, docNessary};
        const params = this.isDoNessary(values.documentId);
        params.fileName = values.fileName;
        if (!params.docmentName) {
          params.docmentName = params.fileName;
        }
        params.fileSize = values.upload[0].size;
        params.docmentRemark = values.docmentRemark;
        params.uploadTime = values.upload[0].lastModifiedDate;
        params.filedId = values.upload[0].response.filedId;
        // get Params from Parent
        // "docmentGroupId":"sfs",
        // "docmentGroupName":"sfs",
        // "bizModelCode":"project",
        // "bizModelID":"111",
        console.log('**submit file info **', params);
        this.props.fetch(Links.updateFile, params).then(data => {
          const record = Object.assign(params, data);
          this.props.freshListData && this.props.freshListData(record);
          this.props.close && this.props.close();
        });
      }
    });
  }

  normFile(e) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { fileType } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form horizontal={true} onSubmit={this.handleSubmit} className={appStyle.container}>
        <FormItem
          {...formItemLayout}
          label="需上传资料名称"
        >
          {getFieldDecorator('documentId', {
            rules: [{ required: true, message: '请选择文件名' }],
            initialValue: ''
          })(
            <Select placeholder="请选择">
              {
                fileType && fileType.map((opt, i) =>
                  (<Option key={opt.code + i} value={opt.code}>{opt.value}</Option>))
              }
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="附件名称"
        >
          {getFieldDecorator('fileName', {
            rules: [{ required: true, message: '请输入文件名' }],
            initialValue: 'lalalla'
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="备注"
        >
          {getFieldDecorator('docmentRemark')(
            <Input type="textarea" />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="上传"
        >
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            normalize: this.normFile,
            rules: [{ required: true, message: '请选择文件', type: 'array' }],
          })(
            <Upload {...this.props} >
              <Button type="ghost">
                <Icon type="upload" /> 上传文件
              </Button>
            </Upload>
          )}
        </FormItem>

        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">提交</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(Dialog);

/**
 * Created by geweimin on 16/10/27.
 */
import React from 'react';
import { Form, Button } from 'mxa';

/* eslint-disable */
let FormDetail;
let keyMap = [];
class FormDetailD extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      isEditing: false,
      editContent: '编辑'
    }
  }

  renderInput() {

  }

  updateClick() {
    this.setState({
      isEditing: !this.state.isEditing,
      editContent: '取消'
    })
  }

  render() {
    let dataSource = this.props.dataDetail;
    for (const i in dataSource) {
      keyMap.push(i);
      console.log('typeof:::' + typeof dataSource[i]);
      switch (typeof dataSource[i]) {
        case 'string':
          this.renderInput();
          console.log('string::' + dataSource[i]);
          break;
        case 'int':
          console.log('int::' + dataSource[i]);
          break;
        case 'boolean':
          console.log('int::' + dataSource[i]);
          break;
        default:
          break;
      }
    }
    if (!this.state.isEditing) {
      return (
        <div>
          {keyMap.map((value, key)=> {
            return (
              <div key={key}>
                <span>{value}:</span>
                <span>{dataSource[value].toString()}</span>
              </div>
            )
          })}
          <Button type='primary' onClick={() => this.updateClick()} >编辑</Button>
        </div>
      )
    } else {
      return (
        <div>
          {this.renderForm(dataSource)}
          <Button type='ghost' onClick={() => this.updateClick()} >取消</Button>
        </div>
      )
    }
  }

  renderForm(dataSource) {

  }

}
export default FormDetail = Form.create()(FormDetailD);


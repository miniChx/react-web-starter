/* eslint-disable no-console */

import React from 'react';
import { autobind } from 'core-decorators';
import { Select, Button } from 'mxa';

const Option = Select.Option;


class SelectableModal extends React.Component {

  constructor(props) {
    super(props);
    // initial state
    this.state = {
      selectedValue: '',
    };
  }

  @autobind
  _handleOk() {
    this.props.callback(this.state.selectedValue);
  }

  @autobind
  _handleChange(value) {
    console.log(`selected ${value}`);
    this.setState({ selectedValue: value });
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: 200,
        }}
      >
        <Select
          style={{ width: 200 }}
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={this._handleChange}
          notFoundContent=""
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
        </Select>
        <Button type="primary" size="large" onClick={this._handleOk}>确认</Button>
      </div>
    );
  }
}

export default SelectableModal;

/**
 * Created by cui on 16/10/27.
 */

import React from 'react';
import { Button, Input } from 'mxa';
import classNames from 'classnames';

const InputGroup = Input.Group;

export default class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      focus: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFocusBlur = this.handleFocusBlur.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  handleFocusBlur(e) {
    this.setState({
      focus: e.target === document.activeElement
    });
  }

  handleSearch() {
    if (this.props.onSearch) {
      this.props.onSearch(this.state.value);
    }
  }

  render() {
    const { style, size, placeholder } = this.props;
    const btnCls = classNames({
      'mx-search-btn': true,
      'mx-search-btn-noempty': !!this.state.value.trim()
    });
    const searchCls = classNames({
      'mx-search-input': true,
      'mx-search-input-focus': this.state.focus
    });
    return (
      <div className="mx-search-input-wrapper" style={style}>
        <InputGroup className={searchCls}>
          <Input
            placeholder={placeholder}
            value={this.state.value}
            onChange={this.handleInputChange}
            onFocus={this.handleFocusBlur}
            onBlur={this.handleFocusBlur}
            onPressEnter={this.handleSearch}
          />
          <div className="mx-input-group-wrap">
            <Button icon="search" className={btnCls} size={size} onClick={this.handleSearch} />
          </div>
        </InputGroup>
      </div>
    );
  }
}

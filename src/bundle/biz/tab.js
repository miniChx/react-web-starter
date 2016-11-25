import React from 'react';
import { Tabs } from 'mxa';

const TabPane = Tabs.TabPane;

export default class Tab extends React.Component {

  callback(key) {
    console.log(key);
  }

  render() {
    const headers = ['heading 1', 'heading 2'];
    return (
      <div>
        <Tabs defaultActiveKey="1" onChange={this.callback} type="card" >
          <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
          <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
          <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
        </Tabs>
      </div>
    );
  }
}

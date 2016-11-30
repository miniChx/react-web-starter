/**
 * Created by baoyinghai on 11/10/16.
 */
import React from 'react';
import { autobind } from 'core-decorators';
import InfoEdit from './infoEdit';
import InfoShow from './infoShow';
// import Layout from '../../../layout';
// import { getSubMenu } from '../../../service/CacheService';

export default class ListDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      model: 'show'
    };
  }

  @autobind
  changeState() {
    if (this.state.model === 'show') {
      this.setState({ model: 'edit' });
    } else {
      this.setState({ model: 'show' });
    }
  }

  @autobind
  renderMain() {
    if (this.state.model === 'show') {
      return (
        <InfoShow {...this.props} changeState={this.changeState} />
      );
    }
    return (
      <InfoEdit {...this.props} changeState={this.changeState} />
    );
  }

  render() {
    // 决定是否套用layout
    // return (
    //   <Layout menu={getSubMenu()} exec={this.props.exec} fetch={this.props.fetch} >
    //     {(this.props.renderMain && this.props.renderMain()) || this.renderMain()}
    //   </Layout>
    // );
    return this.renderMain();
  }
}


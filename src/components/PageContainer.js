/**
 * Created by baoyinghai on 10/21/16.
 */
import React from 'react';
import { searchMenu } from '../service/CacheService';
import { Row, Col, Button } from 'mxa';
import { constructPage } from '../renderTools';
import { PAGE_TYPE_LIST } from '../actions/types';
import NotMatchType from './NotMatchType';
import ListView from './listView';
import { dispatch } from '../service/DispatchService';
import { getInitData } from '../actions/pageContainer';

class PageContainer extends React.Component {

  constructor(props) {
    super(props);
    this.linkInfo = searchMenu(this.props.params.splat);
    this.createPage = this.createPage.bind(this);
    this.getUrlPath = this.getUrlPath.bind(this);
    this.initPageContainer = this.initPageContainer.bind(this);
    console.log(this.linkInfo);
    this.state = {
      page: this.createPage(this.linkInfo.domainLink, this.linkInfo.type)
    };
  }

  getUrlPath(url) {
    return url;
  }

  createPage(link, type) {
    switch(type) {
      case PAGE_TYPE_LIST:
        return (<ListView />);
        break;
      default:
        return (<NotMatchType pageType={type} />);
    }
  }

  getLinkInfoFromMenu() {

  }

  componentWillReceiveProps(next) {
    if (next.params.splat !== this.props.params.splat) {
      this.linkInfo = searchMenu(this.props.params.splat);
      this.setState({
        page: this.createPage(this.linkInfo.domainLink, this.linkInfo.type)
      });
      this.initPageContainer();
    }

  }

  initPageContainer() {
    dispatch(getInitData(this.getUrlPath(this.linkInfo.domainLink)));
  }

  componentDidMount() {
    this.initPageContainer();
    console.log(' fetch data and create page');
  }

  render() {

    return (
      <div>{this.state.page}</div>
    );
  }
}

export default PageContainer;

import React from 'react';

import { getComponentByDomainType } from './config';

const LoadingDecorator = Wrapper => {
  // eslint-disable-next-line react/prefer-stateless-function
  class WrapperComponent extends React.Component {
    render() {
      const tag = getComponentByDomainType(this.props.domainType);
      if ((this.props.domainLink && this.props.dataSource) || tag.loadingSelf || !this.props.domainLink) {
        return (
          <Wrapper
            {...this.props}
          />
        );
      }
      return (<div>数据加载中......</div>);
    }
  }

  return WrapperComponent;
};

export default LoadingDecorator;

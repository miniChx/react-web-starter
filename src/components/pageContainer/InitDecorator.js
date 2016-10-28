/**
 * Created by baoyinghai on 10/28/16.
 */
import { getValueByKey } from '../../common/utils/MapUtils';
import PageConfig from './config';
import { searchMenu } from '../../service/CacheService';

const getSplat = props => {
  return getValueByKey(props, '', 'params', 'splat');
};

const getDomainType = props => {
  return getValueByKey(props, null, 'location', 'state', 'domainType');
};

const createPage = (link, type) => {
  console.log(PageConfig);
  const comp = type ? PageConfig[type] : PageConfig.default;
  return comp;
};

const InitDecorator = Props => {
  let page = null;
  if (getDomainType(Props)) {
    page = createPage(getSplat(Props), getDomainType(Props));
  } else {
    const { linkInfo } = searchMenu(getSplat(Props));
    if (linkInfo) {
      page = createPage(getSplat(Props), linkInfo.domainType);
    } else {
      page = createPage('', 'default');
    }
  }
  return page;
};

export default InitDecorator;

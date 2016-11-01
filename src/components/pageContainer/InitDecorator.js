/**
 * Created by baoyinghai on 10/28/16.
 */
import PageConfig from './config';
import { searchMenu } from '../../service/CacheService';

const createPage = (link, type) => {
  console.log(PageConfig);
  const comp = type ? PageConfig[type] : PageConfig.default;
  return comp;
};

const InitDecorator = ([splat, query, locationState]) => {
  let page = null;
  if (query.domainType) {
    page = createPage(splat, query.domainType);
  } else {
    const { linkInfo } = searchMenu(splat);
    if (linkInfo) {
      page = createPage(splat, linkInfo.domainType);
    } else {
      page = createPage('', 'default');
    }
  }
  return [page, splat, query, locationState];
};

export default InitDecorator;

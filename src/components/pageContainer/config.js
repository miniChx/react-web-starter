/**
 * Created by baoyinghai on 10/24/16.
 */
import NotMatchType from '../notMatchType';
import ListView from '../listView';
import ListDetail from '../listDetail';
import Foo from '../Foo';

import { PAGE_TYPE_LIST, PAGE_TYPE_DETAIL } from '../../actions/types';

const defStr = 'default';

const pageMap = {
  [defStr]: NotMatchType,
  [PAGE_TYPE_LIST]: ListView,
  [PAGE_TYPE_DETAIL]: ListDetail,
  foo: Foo,
};

export default pageMap;

export const getComponentByDomainType = domainType => pageMap[domainType] || pageMap.default;

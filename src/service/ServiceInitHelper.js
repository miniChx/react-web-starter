/**
 * Created by baoyinghai on 10/18/16.
 */

import * as DispatchService from './DispatchService';
import * as CacheService from './CacheService';

export const executeInit = (... args) => {
  DispatchService.init(args[0]);
  CacheService.init(args[0]);
}

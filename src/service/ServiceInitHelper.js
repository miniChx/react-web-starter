/**
 * Created by baoyinghai on 10/18/16.
 */

  import { init } from './DispatchService';

export const executeInit = (... args) => {
  init(args[0]);
}

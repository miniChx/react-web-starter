/**
 * Created by baoyinghai on 12/5/16.
 */
import ContextCheck from './contextCheck';
import isAmount from './isAmount';
import isEmail from './isEmail';
import isMatch from './isMatch';
import isMobile from './isMobile';
import isRate from './isRate';
import isString from './isString';
import isTelephone from './isTelephone';
import isTerm from './isTerm';

export default {
  CONTEXTCHECK: ContextCheck,
  ISAMOUNT: isAmount,
  ISEMAIL: isEmail,
  ISMATCH: isMatch,
  ISMOBILE: isMobile,
  ISRATE: isRate,
  ISSTRING: isString,
  ISTELEPHONE: isTelephone,
  ISTERM: isTerm
};

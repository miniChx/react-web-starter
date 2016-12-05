/**
 * Created by baoyinghai on 12/5/16.
 */
import validation from '../../../../utils/validation';

const validator = (record, value) => {
  const reg = new RegExp(record.opt && record.opt.regex);
  if (!reg.test(value)) {
    return new Error((record.opt && record.opt.message) || '不匹配正则');
  }
  return null;
};

export default validator;

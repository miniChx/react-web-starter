/**
 * Created by vison on 12/5/16.
 */
import validation from '../../../../utils/validation';

const validator = (record, value) => {
  const opt = (record.formValidate && record.formValidate.opt) || {};
  const reg = new RegExp(opt.regex);
  if (!reg.test(value)) {
    return new Error((opt.message) || '不匹配正则');
  }
  return null;
};

export default validator;

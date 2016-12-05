/**
 * Created by baoyinghai on 12/5/16.
 */
import validation from '../../../../utils/validation';

const validator = (record, value) => {
  if (typeof value !== 'string') {
    return new Error((record.opt && record.opt.message) || '格式错误');
  }
  return null;
};

export default validator;

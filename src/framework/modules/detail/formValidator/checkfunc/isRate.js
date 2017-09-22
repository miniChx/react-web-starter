/**
 * Created by vison on 12/5/16.
 */
import validation from '../../../../utils/validation';

const validator = (record, value) => {
  const handle = validation.isRate;
  const opt = (record.formValidate && record.formValidate.opt) || {};
  if (!handle(value)) {
    return new Error((opt.message) || '格式错误');
  }
  const { max, min } = opt;
  if (value > max) {
    return new Error('最大不能超过' + max);
  } else if (min && value < min) {
    return new Error('最小不能超过' + min);
  }
  return null;
};

export default validator;

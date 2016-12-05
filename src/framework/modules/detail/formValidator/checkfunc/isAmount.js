/**
 * Created by baoyinghai on 12/5/16.
 */
import validation from '../../../../utils/validation';

const validator = (record, value) => {
  const handle = validation.isAmount;
  if (!handle(value)) {
    return new Error((record.opt && record.opt.message) || '格式错误');
  }
  const { max, min, decimal, digit } = record.opt;
  if (max && value > max) {
    return new Error('最大不能超过' + max);
  } else if (min && value < min) {
    return new Error('最小不能超过' + min);
  }
  // TODO 小数校验
  return null;
};

export default validator;

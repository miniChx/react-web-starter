/**
 * Created by baoyinghai on 12/5/16.
 */
import validation from '../../../../utils/validation';

const validator = (record, value) => {
  const opt = (record.formValidate && record.formValidate.opt) || {};
  const handle = validation.isTerm;
  if (!handle(value)) {
    // record.formValidate.validateType
    return new Error((opt.message) || '格式错误');
  }
  const { before, after } = opt;
  if (value > before) {
    return new Error('在' + before + '之前');
  } else if (value < after) {
    return new Error('在' + after + '之后');
  }
  return null;
};

export default validator;

/**
 * Created by baoyinghai on 12/5/16.
 */
import validation from '../../../../utils/validation';

const validator = (record, value) => {
  const opt = (record.formValidate && record.formValidate.opt) || {};
  const handle = validation.isTelephone;
  if (value && !handle(value)) {
    return new Error((opt.message) || '格式错误');
  }
  return null;
};

export default validator;

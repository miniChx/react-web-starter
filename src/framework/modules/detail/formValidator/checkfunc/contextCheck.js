/**
 * Created by baoyinghai on 12/5/16.
 */
import validation from '../../../../utils/validation';
import { createFunc } from '../../../../utils/JSExecutor';

const validator = (record, value, formValues) => {
  try {
    const vFunc = createFunc(record.opt && record.opt.validatorFunc);
    if (!vFunc(formValues, value)) {
      return new Error((record.opt && record.opt.message) || '上下文检查错误');
    }
  } catch (err) {
    return err;
  }
  return null;
};

export default validator;

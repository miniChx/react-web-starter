/**
 * Created by vison on 12/5/16.
 */
import validation from '../../../../utils/validation';
import { createFunc } from '../../../../utils/JSExecutor';

const validator = (record, value, formValues) => {
  try {
    const opt = (record.formValidate && record.formValidate.opt) || {};
    let vFunc = opt.validatorFunc;
    if (!typeof vFunc === 'function') {
      vFunc = createFunc(vFunc);
    }
    if (!vFunc(formValues, value)) {
      return new Error((opt.message) || '上下文检查错误');
    }
  } catch (err) {
    return err;
  }
  return null;
};

export default validator;

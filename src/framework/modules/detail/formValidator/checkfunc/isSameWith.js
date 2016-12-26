/**
 * Created by baoyinghai on 12/5/16.
 */
import validation from '../../../../utils/validation';
import { createFunc } from '../../../../utils/JSExecutor';

const validator = (record, value, formValues) => {
  try {
    const opt = (record.formValidate && record.formValidate.opt) || {};
    const vFunc = opt.formItemName;
    if (formValues[vFunc] !== value) {
      return new Error((opt.message) || '与' + vFunc + '不一致');
    }
  } catch (err) {
    return err;
  }
  return null;
};

export default validator;

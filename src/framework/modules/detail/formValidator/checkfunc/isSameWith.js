/**
 * Created by baoyinghai on 12/5/16.
 */
import validation from '../../../../utils/validation';
import { createFunc } from '../../../../utils/JSExecutor';
import { CONFIRM_SUFFIX } from '../../constant';

const validator = (record, value, formValues, form) => {
  try {
    const reg = new RegExp('^\\w+' + CONFIRM_SUFFIX + '$');
    if (reg.test(record.name)) {
      const opt = (record.formValidate && record.formValidate.opt) || {};
      const vFunc = opt.formItemName;
      if (value && formValues[vFunc] !== value) {
        return new Error((opt.message) || '与' + opt.description + '不一致');
      }
    } else {
      form.validateFields([record.name + CONFIRM_SUFFIX], { force: true });
    }
  } catch (err) {
    return err;
  }
  return null;
};

export default validator;

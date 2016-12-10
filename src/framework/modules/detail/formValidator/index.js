import checkFunc from './checkfunc';

// 表单校验
const createRules = (record, form) => {
  const ret = [];
  const isRequired = {};
  ret.push({ validator(rule, value, callback, source, options) {
    if (record.isRequired && (value === null || value === 'undefined')) {
      callback(new Error('请输入' + record.description));
    } else {
      const validateType = record && record.formValidate && record.formValidate.validateType;
      const errors = checkFunc[validateType] && checkFunc[validateType](record, value, form.getFieldsValue());
      callback((errors && [errors]) || []);
    }
  },
    required: record.isRequired });
  return ret;
};

export default createRules;

import checkFunc from './checkfunc';

// 表单校验
const createRules = (record, form) => {
  const ret = [];

  const isRequired = { required: record.isRequired, message: '请输入' + record.description };
  if (record.type === 'Date') {
    isRequired.type = 'object';
  } else if (record.type === 'Double' || record.type === 'Long' || record.type === 'Integer' || record.type === 'Float') {
    isRequired.type = 'number';
  }
  ret.push(isRequired);
  ret.push({ validator(rule, value, callback, source, options) {
    const validateType = record && record.formValidate && record.formValidate.validateType;
    const errors = checkFunc[validateType] && checkFunc[validateType](record, value, form.getFieldsValue());
    callback((errors && [errors]) || []);
  } });
  return ret;
};

export default createRules;

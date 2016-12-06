import checkFunc from './checkfunc';

// 表单校验
const createRules = (record, form) => {
  const ret = [];
  const isRequired = {};
  ret.push({ validator(rule, value, callback, source, options) {
    if (record.isRequired && (value === null || value === 'undefined')) {
      callback(new Error('请输入' + record.description));
    } else {
      const errors = checkFunc[record.validateType] && checkFunc[record.validateType](record, value, form.getFieldsValue());
      callback((errors && [errors]) || []);
    }
  },
    required: record.isRequired });
  return ret;
};

export default createRules;

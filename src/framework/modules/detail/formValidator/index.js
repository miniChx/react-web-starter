import checkFunc from './checkfunc';

// 表单校验
const createRules = (record, form) => {
  const ret = [];
  const isRequired = {};
  if (record.isRequired) {
    isRequired.required = true;
    ret.push({ required: true, message: '请输入' + record.description });
  }
  ret.push({ validator(rule, value, callback, source, options) {
    console.log(value);
    console.log(source);
    const errors = checkFunc[record.validateType] && checkFunc[record.validateType](record, value, form.getFieldsValue());
    callback((errors && [errors]) || []);
  } });
  return ret;
};

export default createRules;

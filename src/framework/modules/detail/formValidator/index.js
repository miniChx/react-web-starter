import checkFunc from './checkfunc';
import TypeDic from './typeDic';

// 表单校验
const createRules = (record, form) => {
  const ret = [];
  const isRequired = { required: record.isRequired, message: '请输入' + record.description };
  isRequired.type = TypeDic[record.type];
  ret.push(isRequired);
  ret.push({ validator(rule, value, callback) {
    const validateType = record && record.formValidate && record.formValidate.validateType;
    const errors = checkFunc[validateType] && checkFunc[validateType](record, value, form.getFieldsValue(), form);
    callback((errors && [errors]) || []);
  } });
  return ret;
};

export default createRules;

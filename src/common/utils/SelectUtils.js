/**
 * Created by cui on 16/11/1.
 */
/* eslint-disable */
export const constructFilterFieldCodes = (filterItems, filterFieldCodes, fieldName) => {
  const newFilterFieldCodes = filterFieldCodes;
  if (filterItems) {
    filterItems.map((filter) => {
      if (fieldName.indexOf(filter.fieldName.toUpperCase()) !== -1){
        if (newFilterFieldCodes.length === 0) {
          newFilterFieldCodes.push(fieldName);
        } else {
          newFilterFieldCodes.map((item, index) => {
            if (item.indexOf(filter.fieldName.toUpperCase()) !== -1 &&
              fieldName.indexOf(filter.fieldName.toUpperCase()) !== -1) {
              newFilterFieldCodes.splice(index,1,fieldName);
            } else {
              if (newFilterFieldCodes.length < filterItems.length) {
                newFilterFieldCodes.push(fieldName);
              }
            }
          })
        }
      }
    })
  }
  return newFilterFieldCodes;
};

export const constructOrderFields = (orderItems) => {
  const orderFields = [];
  if (orderItems) {
    orderItems.map((item) => {
      const temp = {
        orderField: item.fieldName,
        orderType: item.isAsc ? 'Asc' : 'Desc'
      };
      orderFields.push(temp);
    });
  }
  console.log(orderFields);
  return orderFields;
};


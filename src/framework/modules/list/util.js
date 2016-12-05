
export const handleOrderItems = orderItems => {
  const orderFields = {};
  if (orderItems && orderItems.length > 0) {
    orderItems.forEach(item => {
      // const temp = {
      //   orderField: item.fieldName,
      //   orderType: item.isAsc ? 'Asc' : 'Desc'
      // };
      orderFields[item.fieldName] = item;
    });
  }
  return orderFields;
};

export const arr2obj = (array, key) => {
  const result = [];
  array.forEach(item => {
    result[item[key]] = item;
  });
  return result;
};

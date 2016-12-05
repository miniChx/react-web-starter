
export const arr2obj = (array, key) => {
  const result = [];
  array.forEach(item => {
    result[item[key]] = item;
  });
  return result;
};

export const handleFilterItems = (filterItems, fieldsObject) =>
  filterItems.map(filter => {
    // const fieldData = data.fields.find(field => field.name === filter.fieldName);
    const fieldData = fieldsObject[filter.fieldName];
    if (fieldData) {
      return {
        ...filter,
        type: fieldData.displayComponent.componentType,
        extra: fieldData.displayComponent.dictionaryItems,
      };
    }
    return filter;
  });

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

export const handleContentList = (contentList, fieldsObject) =>
  contentList.map((content, index) => {
    const output = { key: index };
    Object.keys(content).forEach(field => {
      if (fieldsObject[field].displayComponent.componentType === 'SELECT') {
        output[field] = fieldsObject[field].displayComponent.dictionaryItems
          .find(dict => dict.code === content[field]).value;
      } else {
        output[field] = content[field];
      }
    });

    return output;
  });

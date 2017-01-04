import moment from 'moment';

export const arr2obj = (array, key) =>
  array.reduce((result, item) => {
    result[item[key]] = item;
    return result;
  }, {});

export const handleFilterItems = (filterItems, fieldsObject) =>
  filterItems.map(filter => {
    // const fieldData = data.fields.find(field => field.name === filter.fieldName);
    const fieldData = fieldsObject[filter.fieldName];
    if (fieldData) {
      return {
        ...filter,
        type: fieldData.displayComponent.componentType,
        extra: fieldData.displayComponent.dictionaryItems,
        dataType: fieldData.type,
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
  contentList && contentList.map((record, index) => {
    const output = { key: index };
    Object.keys(record).forEach(field => {
      const fieldContent = fieldsObject[field];
      if (!fieldContent) {
        output[field] = '';
      } else if (fieldContent.displayComponent.componentType === 'SELECT') {
        const dictItem = fieldContent.displayComponent.dictionaryItems
          .find(dict => dict.code === record[field]);
        output[field] = (dictItem && dictItem.value) || record[field];
      } else if (fieldContent.type === 'Date') {
        output[field] = moment(new Date(record[field])).format('YYYY-MM-DD');
      } else {
        output[field] = record[field];
      }
    });

    return output;
  });

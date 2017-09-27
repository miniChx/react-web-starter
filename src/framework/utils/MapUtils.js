/**
 * Created by vison on 10/26/16.
 */
/* eslint-disable */
export const getValueByKeyNoDef = (entry, def, ...keys) => {
  if (keys && keys.length === 0) {
    return entry;
  }
  return (entry && getValueByKey(entry[keys[0]], def, ...keys.slice(1)));
};

export const getValueByKey = (entry, def, ...keys) => {
  const tag = getValueByKeyNoDef(entry, def, ...keys);
  if (tag === undefined || tag === null) {
    return def;
  }
  return tag;
};

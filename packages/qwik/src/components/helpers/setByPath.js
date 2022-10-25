function setByPath(obj, path, value) {
  const pList = path.split(".");
  const len = pList.length;
  for (let i = 0; i < len - 1; i++) {
    const elem = pList[i];
    if (!obj[elem])
      obj[elem] = {};
    obj = obj[elem];
  }
  obj[pList[len - 1]] = value;
}
export {
  setByPath as default
};

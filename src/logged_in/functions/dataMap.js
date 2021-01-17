function dataMap (array, string) {

  const output = array.map(el => el[string]);

  return output;
}

export default dataMap;

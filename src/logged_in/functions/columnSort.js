function columnSort(array, cmp) {
  const sortedArray = array.map((el, index) => [el, index]);
  sortedArray.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return sortedArray.map(el => el[0]);
}
export default columnSort;

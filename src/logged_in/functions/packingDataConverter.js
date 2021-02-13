import mealsFormatter from './mealsFormatter'

const packingDataConverter = (data) => {

  let formattedMealData = [];
  let elCount = 0
  data.forEach(el => {
    const array = mealsFormatter(el);
    array.forEach(formattedEl => {
      const obj = {}
      obj.meal = formattedEl
      obj.description = el.description
      formattedMealData.push(obj)
    });
    elCount++
  });

  let array = [];
  const obj = {};
  formattedMealData.forEach(el => {
    const template = {
      value: 0,
      description: ''
    }
    if (Object.keys(obj).includes(el.meal)) {
      obj[el.meal].value ++;
    } else {
      obj[el.meal] = template
      obj[el.meal].value = 1;
    }
    obj[el.meal].description = el.description
  });

  for (let i in obj) {
    let newObj = {
      description: '',
      meal:'',
      value: null
    }
    newObj.meal = i;
    newObj.description = obj[i].description;
    newObj.value = obj[i].value;
    array.push(newObj);
  }
  console.log(obj)

  return array;
}

export default packingDataConverter;
import mealsFormatter from './mealsFormatter'

const packingDataConverter = (data) => {

  let formattedMealData = [];
  data.forEach(el => {
    const array = mealsFormatter(el);
    array.forEach(el => formattedMealData.push(el));
  });

  let array = [];
  const obj = {};
  let descriptionCount = 0;
  let mealCount =0;
  formattedMealData.forEach(el => {
    obj[el] = {
      value: 0,
      description: ''
    }
    if (Object.keys(obj).includes(el)) {
      obj[el].value ++;
    } else {
      obj[el].value = 1;
    }
    obj[el].description = data[descriptionCount]
    mealCount ++;
    if (mealCount === data[descriptionCount].meal.length) {
      descriptionCount++
      mealCount = 0;
    }
  });

  for (let i in obj) {
    let newObj = {
      description: '',
      meal:'',
      value: null
    }
    newObj.meal = i;
    newObj.description = obj[i].description.description;
    newObj.value = obj[i].value;
    array.push(newObj);
  }

  return array;
}

export default packingDataConverter;
import mealsFormatter from './mealsFormatter'

const packingDataConverter = (data) => {

  let formattedMealData = []
  data.forEach(el => {
    const array = mealsFormatter(el)
      array.forEach(el => formattedMealData.push(el))
  })

  let array = [];
  const obj = {}

  formattedMealData.forEach(el => {
    if (Object.keys(obj).includes(el)) {
      obj[el] ++
    } else {
      obj[el] = 1
    }
  })

  for (let i in obj) {
    let newObj = {
      description: '',
      value: null
    }
    newObj.description = i
    newObj.value = obj[i]
    array.push(newObj)
  }


  return array
}

export default packingDataConverter
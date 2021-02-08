import * as dayjs from 'dayjs'
import mealsFormatter from './mealsFormatter'

const mealsCalculation = (data, history) => {

  let formattedMealData = []
  const output = {
    mealsRegistered: 0,
    popularMeal: ''
  }
  let today = new Date();
  let targetDate = new Date(today - history*86400000)
  
  if (history === 0) {
    output.mealsRegistered = data.length
    data.forEach(el => {
      const array = mealsFormatter(el)
      array.forEach(el => formattedMealData.push(el))
    })
  }
  else {
    const sortedArr = data.sort((a,b) => {
      let aDate = dayjs(`${a['time']+':00.000Z'}`).valueOf()
      let bDate = dayjs(`${b['time']+':00.000Z'}`).valueOf()
      return aDate -bDate
    })
    const filteredArray = sortedArr.filter(el => {
      return dayjs(`${el['time']+':00.000Z'}`).valueOf()> dayjs(targetDate).valueOf()
    })
    output.mealsRegistered = filteredArray.length
    filteredArray.forEach(el => {
      const array = mealsFormatter(el)
      array.forEach(el => formattedMealData.push(el))
    })
  }
  
  let popular = 'No meals added'
  let currentMax = 0
  
  const obj = {}

  formattedMealData.forEach(el => {
    console.log(el)
    if (Object.keys(obj).includes(el)) {
      obj[el] ++
      if (obj[el] > currentMax) {
        popular = el
        currentMax++
      }
    }
    else {
      obj[el] = 1
      if (currentMax < 1) currentMax = 1
      if (currentMax === 1 || currentMax === 0) popular = el
    }
  })
  output.popularMeal = popular
  return output
}

export default mealsCalculation
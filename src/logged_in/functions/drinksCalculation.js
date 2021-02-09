import * as dayjs from 'dayjs'
import drinksConverter from './drinksConverter'

const drinksCalculation = (data, history) => {

  const volumePerCup = 250

  const output = {
    drinksRegistered: 0,
    popularDrink: ''
  }
  let today = new Date();
  let targetDate = new Date(today - history*86400000)

  data = data.sort((a,b) => {
    let aDate = dayjs(`${a['time']+':00.000Z'}`).valueOf()
    let bDate = dayjs(`${b['time']+':00.000Z'}`).valueOf()
    return aDate -bDate
  })
  
  if (history === 0) {
    output.drinksRegistered = data.length
  }
  else {
    const filteredArray = data.filter(el => {
      return dayjs(`${el['time']+':00.000Z'}`).valueOf()> dayjs(targetDate).valueOf()
    })
    output.drinksRegistered = filteredArray.length
    data = filteredArray
  }
  
  let popular = 'No meals added'
  let currentMax = 0
  
  const obj = {}

  data.forEach(el => {
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
  output.popularDrink = popular
  return output
}

export default drinksCalculation
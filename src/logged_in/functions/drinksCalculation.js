import * as dayjs from 'dayjs'

const drinksCalculation = (data, history, volume=true) => {

  const output = {
    drinksRegistered: 0,
    popularDrink: ''
  }
  let today = new Date();
  let targetDate = new Date(today - history*86400000)

  
  if (history === 0) {
    output.drinksRegistered = data.length
  }
  else {
    data = data.sort((a,b) => {
      let aDate = dayjs(`${a['time']+':00.000Z'}`).valueOf()
      let bDate = dayjs(`${b['time']+':00.000Z'}`).valueOf()
      return aDate -bDate
    })
  
    const filteredArray = data.filter(el => {
      return dayjs(`${el['time']+':00.000Z'}`).valueOf()> dayjs(targetDate).valueOf()
    })
    output.drinksRegistered = filteredArray.length
    data = filteredArray
  }
  
  let popular = 'No drinks added';
  let currentMax = 0;
  const obj = {}
  let parameter;

  volume === true ? parameter = 'volume' : parameter = 'cups';

  data.forEach(el => {
    if (Object.keys(obj).includes(el['drink'])) {
      obj[el['drink']] += el[parameter]
      if (obj[el['drink']] > currentMax) {
        popular = el['drink']
        currentMax += el[parameter]
      }
    }
    else {
      obj[el['drink']] = el[parameter]
      if (currentMax === 0 || currentMax < el[parameter]) {
        popular = el['drink']
        currentMax = el[parameter]
      }
    }
  })
  output.popularDrink = popular
  return output
}

export default drinksCalculation
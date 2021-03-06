const scatterDataConverter = (dataInput) => {
  const data = dataInput.data.getAllMeals.slice();
  const description = new Set(data.map(el => el.description))
  const dataWithValueAndConvertedTime = data.map(mapEl => {
    const identifier = [...description].filter(filterEl => {
      return filterEl.meal === mapEl.description
    })
    mapEl.value = identifier[0].value
    return mapEl
  })
  return dataWithValueAndConvertedTime
}

export default scatterDataConverter
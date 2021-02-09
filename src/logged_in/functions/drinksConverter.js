const drinksConverter = (data, volumePerCup) => {
  const output = data.map(el => {
    if (el.cups === null) el.cups = Math.round(el.volume/volumePerCup)
    if (el.volume === null) el.volume = el.cups*volumePerCup
    return el
  })
  return output;
}

export default drinksConverter
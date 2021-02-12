const mealsFormatter = (data) => {
  
  const formattedArray = [];
  const numberRegex = /([0-9]\/[0-9])|[0-9]/g;
  const nonWordRegex = /[\-()/+]|(\set\s)/gi;

  const mealsInputNoNumbers = data.meal.map(el => el.replace(numberRegex,''));
  const mealsInputNoNonWord = mealsInputNoNumbers.map(el => el.replace(nonWordRegex,','));
  const check = mealsInputNoNonWord.map(el => el.split(','));
  const trim = check.map(el=> el.map(el => el.trim()));
  const split = trim.map(el =>el.join(',').split(','));
  split.map(el => el.forEach(el => {
    if (el.length) {
      el = el.charAt(0).toUpperCase() + el.slice(1)
      formattedArray.push(el)
    }
  }));
  return formattedArray;
}

export default mealsFormatter;
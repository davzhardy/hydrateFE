import React, { Fragment, useEffect } from "react";
import { useSelector } from 'react-redux'
import Test from './Test'
import { useQueryClient } from "react-query";

function Graphs( { selectGraphs } ) {

  useEffect(selectGraphs, [selectGraphs]);


  const queryClient = useQueryClient()
  const mealsData = queryClient.getQueryData('meals')
  const drinksData = queryClient.getQueryData('drinks')

  const UserId = useSelector((state) => state.user.UserId);

  const potentialMeals = [
    { meal: 'Breakfast' },
    { meal: 'Lunch' },
    { meal: 'Dinner' },
    { meal: 'Snack' },
  ];

  const outputFormat = {
    name: "flare",
    children: ''}

  const dataFunction = (dataInput) => {
    const mealsArray = potentialMeals.map(el => el.meal);

    const mealsData = dataInput.data.getAllMeals.slice();
    const outputArray = mealsArray.map(el => {
      return {name: el, children: []}
    });
  
    const numberRegex = /([0-9]\/[0-9])|[0-9]/g;
    const nonWordRegex = /[\-()/+]|(\set\s)/gi;
  
    for (let i=0; i<mealsArray.length; i++) {
      const childrenElement = [];
      const output = []
      for (let j=0; j<mealsData.length; j++) {
        if(mealsData[j]['description'] === mealsArray[i]) {
          const mealsInput = mealsData[j]['meal']
          const mealsInputNoNumbers = mealsInput.map(el => el.replace(numberRegex,''))
          const mealsInputNoNonWord = mealsInputNoNumbers.map(el => el.replace(nonWordRegex,','))
          const check = mealsInputNoNonWord.map(el => el.split(','))
          const trim = check.map(el=> el.map(el => el.trim()))
          const split = trim.map(el =>el.join(',').split(','))
          split.map(el => el.forEach(el => childrenElement.push(el)))
        }
      }
      childrenElement.forEach(el => {
        const mealObj = {
          name: 'xxx',
          value: Math.random()
        }
        mealObj.name = el
        output.push(mealObj)
      })
      outputArray[i].children = output
    }
    outputFormat.children = outputArray
  }

  dataFunction(mealsData)

  return (
    <Fragment>
      <Test data={outputFormat}/>
    </Fragment>
  )

  
}

export default Graphs;
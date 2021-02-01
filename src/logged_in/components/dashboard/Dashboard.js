import React, { Fragment } from "react";
import { Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import AddDrinkArea from "../drink/AddDrinkArea"
import AddMealArea from "../meal/AddMealArea"
import DataArea from "../datavisualisation/DataArea"
import CirclePack from '../graphs/CirclePack'
import Test from '../graphs/Test'
import { useQuery } from "react-query";
import { endpoint, queries, getOptions } from '../../../api'

function Dashboard() {

  const UserId = useSelector((state) => state.user.UserId);

  const { data, status } = useQuery(
    "drinks", 
    async () => 
      fetch(endpoint, getOptions(queries.GET_ALL_DRINKS,UserId))
        .then(res => res.json())
        .catch((err) => {
          console.log('Error:', JSON.stringify(err)) //eslint-disable-line no-console
        }),
    // {
    //   onSuccess: (data) => dataFunction(data)
    // }
  )

  const { data: data1, status: status1 } = useQuery(
    "meals",
    async () => 
      fetch(endpoint, getOptions(queries.GET_ALL_MEALS,UserId))
        .then(res => res.json())
        .catch((err) => {
          console.log('Error:', JSON.stringify(err)) //eslint-disable-line no-console
        }),
    // {
    //   onSuccess: (data) => dataFunction(data)
    // }
  )

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


  if ( [status, status1].includes("loading") ) return <p>Loading....</p>
  if ( [status, status1].includes("error") ) return <p>An error has been thrown</p>
  else { 
    dataFunction(data1)
    return (
    
    <Fragment>
      <Grid container spacing ={6}>
        <Grid item xs={12} sm={6} style={{display: 'flex'}}>
          <AddDrinkArea UserId={UserId}/>
        </Grid>
        <Grid item xs={12} sm={6} style={{display: 'flex'}}>
          <AddMealArea UserId={UserId} potentialMeals={potentialMeals}/>
        </Grid>
      </Grid>
      <DataArea data={data.data.getAllDrinks} tablename={'Drink'}/>  
      <DataArea 
        data={data1.data.getAllMeals} 
        UserId={UserId}
        tablename={'Meal'}
      />
    </Fragment>
  )}

  
}

export default Dashboard;

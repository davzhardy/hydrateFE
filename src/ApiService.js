import React from "react";
import { 
  useQuery, 
  // useQueries,
  useMutation,
 } from "react-query";
import { GET_ALL_DRINKS, GET_ALL_MEALS } from './api/queries'
import { CREATE_USER, POST_DRINK, POST_MEAL } from './api/mutations'

export default function ApiService() {

  const endpoint = 'http://localhost:4000'
  const UserId = 2;
  
  const getOptions = (func, args) => { 
    return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(func(args))
  }}

  const mutateOptions = (item) => {
    console.log(item)
    return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(item)
  }}
      
  const { data, status, error } = useQuery("drinks", () => 
    fetch(endpoint, getOptions(GET_ALL_DRINKS,UserId))
      .then(res => res.json()))

  const { data: data1, status: status1, error: error1 } = useQuery("meals", () => 
    fetch(endpoint, getOptions(GET_ALL_MEALS,UserId))
      .then(res => res.json()))
  
  const mealMutation = useMutation((newMeal) => 
    fetch(endpoint, mutateOptions(newMeal))
      .then(res => res.json()))

  const drinkMutation = useMutation((newDrink) => 
    fetch(endpoint, mutateOptions(newDrink))
      .then(res => res.json()))

  if ( [status, status1].includes("loading") ) return <p>Loading....</p>
  if ( [status, status1].includes("error") ) return <p>An error has been thrown</p>

  return (
    <>
      <div>
        {data && data.data.getAllDrinks.map(el => <p>{el.drink}</p>)}
        {data && data1.data.getAllMeals.map(el => <p>{el.meal.join(' ')}</p>)}
      </div>
      <div>
        {mealMutation.isLoading ? (
          'Adding meal...'
        ) : (
          <>
            {mealMutation.isError ? (
              <div>An error occurred: {mealMutation.error.message}</div>
            ) : ''}
  
            {mealMutation.isSuccess ? <div>{mealMutation.data.data.postMeal.meal} </div> : 'Failed'}
            <button
              onClick={() => {
                mealMutation.mutate(POST_MEAL({UserId:2, description:'A dsds Breakfast', meal: ['qw', 'jerky'], time:'2019-01-13T17:20'}))
              }}
            >
              Create Meal
            </button>
          </>
        )}
      </div>
      <div>
        {drinkMutation.isLoading ? (
          'Adding drink...'
        ) : (
          <>
            {drinkMutation.isError ? (
              <div>An error occurred: {drinkMutation.error.message}</div>
            ) : ''}
  
            {drinkMutation.isSuccess ? <div>{drinkMutation.data.data.postDrink.drink} </div> : 'Failed'}
            <button
              onClick={() => {
                drinkMutation.mutate(POST_DRINK({UserId:2, drink:"Bloop", cups: 1, time:'2019-01-13T17:20'}))
              }}
            >
              Create Drink
            </button>
          </>
        )}
      </div>
    </>
  )
}

  
    // const results = useQueries([
  //   { queryKey: 'drinks', queryFn: () => 
  //   fetch(endpoint, options(GET_ALL_DRINKS,UserId))
  //     .then(res => res.json())
  //   },
  //   { queryKey: 'meals', queryFn: () => 
  //   fetch(endpoint, options(GET_ALL_MEALS,UserId))
  //     .then(res => res.json())
  //   }
  // ])

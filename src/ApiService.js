import React from "react";
import { 
  useQuery, 
  // useQueries,
  useMutation,
  useQueryClient
 } from "react-query";
import { queries, mutations } from './api'

const endpoint = 'http://localhost:4000'
const UserId = 2;

const getOptions = (func, args) => { 
  return {
  method: 'POST',
  headers: { 'Content-Type': 'application/json'},
  body: JSON.stringify(func(args))
}}

const mutateOptions = (item) => {
  return {
  method: 'POST',
  headers: { 'Content-Type': 'application/json'},
  body: JSON.stringify(item)
}}

export default function ApiService() {

  const queryClient = useQueryClient()

  const { data, status, error } = useQuery("drinks", () => 
    fetch(endpoint, getOptions(queries.GET_ALL_DRINKS,UserId))
      .then(res => res.json()))

  const { data: data1, status: status1, error: error1 } = useQuery("meals", () => 
    fetch(endpoint, getOptions(queries.GET_ALL_MEALS,UserId))
      .then(res => res.json()))
  
  const mealMutation = useMutation((newMeal) => 
    fetch(endpoint, mutateOptions(newMeal))
      .then(res => res.json())
    ,
    {
      onSuccess: () => queryClient.invalidateQueries('meals')
    }
  )

  const drinkMutation = useMutation((newDrink) => 
    fetch(endpoint, mutateOptions(newDrink))
      .then(res => res.json())
      ,
    {
      onSuccess: () => queryClient.invalidateQueries('drinks')
    }
  )

  if ( [status, status1].includes("loading") ) return <p>Loading....</p>
  if ( [status, status1].includes("error") ) return <p>An error has been thrown</p>

  return (
    <>
      <div>
        {data && data.data.getAllDrinks.map((el, index) => <p key={index}>{el.drink}</p>)}
        {data && data1.data.getAllMeals.map((el, index) => <p key={index}>{el.meal.join(' ')}</p>)}
      </div>
      <div>
        {mealMutation.isLoading ? (
          'Adding meal...'
        ) : (
          <>
            {mealMutation.isError ? (
              <div>An error occurred: {mealMutation.error.message}</div>
            ) : ''}
  
            <button
              onClick={() => {
                mealMutation.mutate(mutations.POST_MEAL({UserId:2, description:'A dsds Breakfast', meal: ['qw', 'jerky'], time:'2019-01-13T17:20'}))
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
            <button
              onClick={() => {
                drinkMutation.mutate(mutations.POST_DRINK({UserId:2, drink:"Coop", cups: 1, time:'2019-01-13T17:20'}))
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

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



  const mealOptions = (item) => {
    console.log(JSON.stringify(item))
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
  
  const mutation = useMutation((newMeal) => 
    fetch(endpoint, mealOptions(newMeal))
      .then(res => res.json()))

  const runMutate = async (func) => {
    const mutationData = await mutation.mutate(func)
  }

  if ( [status, status1].includes("loading") ) return <p>Loading....</p>
  if ( [status, status1].includes("error") ) return <p>An error has been thrown</p>

  return (
    <>
      <div>
        {data && data.data.getAllDrinks.map(el => <p>{el.drink}</p>)}
        {data && data1.data.getAllMeals.map(el => <p>{el.meal.join(' ')}</p>)}
      </div>
      <div>
        {mutation.isLoading ? (
          'Adding meal...'
        ) : (
          <>
            {mutation.isError ? (
              <div>An error occurred: {mutation.error.message}</div>
            ) : ''}
  
            {mutation.isSuccess ? <div>{mutation.data.data.postMeal.meal} </div> : 'Failed'}
            <button
              onClick={() => {
                runMutate(POST_MEAL({UserId:2, description:'A 2nd Breakfast'}))
              }}
            >
              Create Meal
            </button>
          </>
        )}
      </div>
    </>
  )

}
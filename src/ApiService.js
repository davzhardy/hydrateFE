import React from "react";
import { 
  useQuery, 
  // useQueries,
  useMutation,
 } from "react-query";
import { GET_ALL_DRINKS, GET_ALL_MEALS } from './api/queries'
// import { CREATE_USER, POST_DRINK, POST_MEAL } from './api/mutations'

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

  const POST_MEAL =  {query: `mutation {
      postMeal(
        UserId: 2, 
        description: "ddd", 
        meal: ["ccdddc","noobs"], 
        time: "2021-01-13T17:27"
      ){
        description,
        meal,
        time,
      }
    }`
  }
  ;

  const mealOptions = (item) => {
    return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(item)
  }}

  const mutation = useMutation( (xxx) => 
    fetch(endpoint, mealOptions(xxx))
      .then(res => res.json()))
  
      

      // fetch(endpoint, mealOptions(POST_MEAL, newMeal.UserId, newMeal.description, newMeal.meal, newMeal.time))
      // .then(res => res.json()))

  
  const { data, status, error } = useQuery("drinks", () => 
    fetch(endpoint, getOptions(GET_ALL_DRINKS,UserId))
      .then(res => res.json()))

  const { data: data1, status: status1, error: error1 } = useQuery("meals", () => 
    fetch(endpoint, getOptions(GET_ALL_MEALS,UserId))
      .then(res => res.json()))
  
  if ( [status, status1].includes("loading") ) return <p>Loading....</p>
  if ( [status, status1].includes("error") ) return <p>An error has been thrown</p>

  const runMutate = async (func) => {
    const mutationData = await mutation.mutate(func)
    console.log(mutationData)
    console.log(mutation.data)
  }

  mutation.isSuccess ? console.log(mutation) : console.log('none')

  return (
    <>
      <div>
        {data && data.data.getAllDrinks.map(el => <p>{el.drink}</p>)}
        {data && data1.data.getAllMeals.map(el => <p>{el.meal.join(' ')}</p>)}
      </div>
      <div>
        {mutation.isLoading ? (
          'Adding todo...'
        ) : (
          <>
            {mutation.isError ? (
              <div>An error occurred: {mutation.error.message}</div>
            ) : null}
  
            {mutation.isSuccess ? <div>{mutation.data.data.postMeal.meal} </div> : null}
            <button
              onClick={() => {
                runMutate(POST_MEAL)
                console.log(mutation.data)
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
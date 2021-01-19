import React from "react";
import { useQuery, useQueries } from "react-query";
import { GET_ALL_DRINKS, GET_ALL_MEALS } from './api/queries'

export default function ApiService() {

  const endpoint = 'http://localhost:4000'
  const UserId = 2;
  
  const options = (func, args) => { return {
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


  const { data, status, error } = useQuery("drinks", () => 
    fetch(endpoint, options(GET_ALL_DRINKS,UserId))
      .then(res => res.json()))

  const { data: data1, status: status1, error: error1 } = useQuery("meals", () => 
    fetch(endpoint, options(GET_ALL_MEALS,UserId))
      .then(res => res.json()))
  
  if ( [status, status1].includes("loading") ) return <p>Loading....</p>
  if ( [status, status1].includes("error") ) return <p>An error has been thrown</p>

  return (
    <div>
      {data && data.data.getAllDrinks.map(el => <p>{el.drink}</p>)}
      {data && data1.data.getAllMeals.map(el => <p>{el.meal}</p>)}
    </div>
  )

}
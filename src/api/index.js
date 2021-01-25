import { GET_ALL_DRINKS, GET_ALL_MEALS, GET_USER } from './queries'
import { CREATE_USER, POST_DRINK, POST_MEAL, MODIFY_MEAL } from './mutations'

// const endpoint = 'http://localhost:4000'
const endpoint = 'https://hydrateapp.herokuapp.com/'

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

function getUser (details) {
  return fetch(endpoint, mutateOptions(GET_USER(details)))
    .then(res => res.json())
    .catch((err) => {
      console.log('Error:', JSON.stringify(err)) //eslint-disable-line no-console
    })
}

const queries = {
  GET_ALL_DRINKS,
  GET_ALL_MEALS,
}

const mutations = {
  CREATE_USER, 
  POST_DRINK, 
  POST_MEAL,
  MODIFY_MEAL
}

export {
  endpoint,
  getOptions,
  mutateOptions,
  queries,
  mutations,
  getUser,
}
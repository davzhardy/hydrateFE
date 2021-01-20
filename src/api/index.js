import { GET_ALL_DRINKS, GET_ALL_MEALS, GET_USER } from './queries'
import { CREATE_USER, POST_DRINK, POST_MEAL } from './mutations'

const endpoint = 'http://localhost:4000'

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

const queries = {
  GET_ALL_DRINKS,
  GET_ALL_MEALS,
  GET_USER
}

const mutations = {
  CREATE_USER, 
  POST_DRINK, 
  POST_MEAL
}

export {
  endpoint,
  getOptions,
  mutateOptions,
  queries,
  mutations
}
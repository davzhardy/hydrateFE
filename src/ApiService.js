import React from "react";
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

const queryClient = new QueryClient();

const endpoint = 'http://localhost:4000'

const UserId = 2;

const GET_ALL_DRINKS = {query: `query {
  getAllDrinks(UserId: ${UserId}) {
    drink,
    cups,
    volume,
    time,
  }
}`
};

const options = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json'},
  body: JSON.stringify(GET_ALL_DRINKS)
}

fetch(endpoint, options)
  .then(r => r.json())
  .then(data => console.log('data returned:', data));

// export {
//   GET_ALL_DRINKS
// }

// const options = {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json'},
//   body: JSON.stringify({query:`query {
//     getAllDrinks(UserId: ${UserId}) {
//       drink,
//       cups,
//       volume,
//       time,
//     }
//   }`
//   })
// }

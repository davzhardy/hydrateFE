import { useQuery } from "react-query";
import { endpoint, queries, getOptions } from '../../../api'


function GetMeals (UserId) {
  const output = {}
  const { data: data1, status: status1 } = useQuery(
    "meals",
    async () => 
      fetch(endpoint, getOptions(queries.GET_ALL_MEALS,UserId))
        .then(res => res.json())
        .catch((err) => {
          console.log('Error:', JSON.stringify(err)) //eslint-disable-line no-console
        }),
  )
  output.data = data1
  output.status = status1
  return output
}

function GetDrinks (UserId) {
  const output = {}
  const { data, status } = useQuery(
    "drinks", 
    async () => 
      fetch(endpoint, getOptions(queries.GET_ALL_DRINKS,UserId))
        .then(res => res.json())
        .catch((err) => {
          console.log('Error:', JSON.stringify(err)) //eslint-disable-line no-console
        }),
  )
  output.data = data
  output.status = status
  return output
}

// function ModifyMeal () {
//   const queryClient = useQueryClient()

//   const modifyMealMutation = useMutation((mealToModify) => 
//     fetch(endpoint, mutateOptions(mealToModify))
//       .then(res => res.json())
//       ,
//     {
//       onSuccess: () => queryClient.invalidateQueries('meals') // note this needs to be consistent with the useQuery 
//     }
//   )
//   return modifyMealMutation
// }


export {
  GetMeals,
  GetDrinks,
  // ModifyMeal,
}
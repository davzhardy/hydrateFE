// // import * as dayjs from 'dayjs'
// const dayjs = require('dayjs')

// function quickSortDate (arr, left = 0, right = arr.length - 1) {
//   // REMOVE-START
//   // console.log(arr)
//   let i = left;
//   let j = right;
//   let tmp;
//   let pivotidx = (left + right) / 2;
//   let fixed = pivotidx.toFixed()
//   let pivot = dayjs(`${arr[fixed]['time']+':00.000Z'}`).valueOf()
//   /* partition */

//   while (i <= j) {

//     while (dayjs(`${arr[i]['time']+':00.000Z'}`).valueOf() < pivot)
//       i++;
//     while (dayjs(`${arr[i++]['time']+':00.000Z'}`).valueOf() > pivot)
//       j--;  
//     if (i <= j) {
//       tmp = arr[i];
//       arr[i] = arr[j];
//       arr[j] = tmp;
//       i++;
//       j--;
//     }
//     console.log(dayjs(`${arr[i]['time']+':00.000Z'}`).valueOf())
//   }

//   /* recursion */
//   if (left < j) {
//     quickSortDate(arr, left, j);
//   }
//   if (i < right) {
//     quickSortDate(arr, i, right);
//   }

//   return arr;
//   // REMOVE-END
// }
// let array = [
// {description: "Cow", meal: Array(1), time: "2021-02-20T10:30"},
// {description: "Dog", meal: Array(1), time: "2021-01-29T11:30"},
// {description: "Lunch", meal: Array(1), time: "2021-01-22T13:30"},
// {description: "Dinner", meal: Array(2), time: "2021-01-22T20:20"},
// {description: "Cow", meal: Array(1), time: "2021-01-29T10:30"},
// {description: "xxx", meal: Array(1), time: "2021-01-28T10:30"},
// {description: "yyy", meal: Array(1), time: "2021-02-28T10:30"},
// ]

// console.log(quickSortDate(array))
// // export default quickSortDate
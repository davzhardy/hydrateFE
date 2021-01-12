import React from "react";
import { TextField } from '@material-ui/core'

function TimeInput() {

  const today = new Date();
  const minute = today.getMinutes();
  const hour = today.getHours();
  const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
  const month = today.getMonth()+1 < 10 ? `0${today.getMonth()+1}` : today.getMonth()+1 ;
  const year = today.getFullYear();

  const date = `${year}-${month}-${day}T${hour}:${minute}`

  return (
    <>
      <TextField
        id="date"
        variant="filled"
        color="secondary"
        type="datetime-local"
        label="Time"
        defaultValue={date}
      />
    </>
  )
}

export default TimeInput;

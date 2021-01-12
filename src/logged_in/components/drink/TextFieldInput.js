import React, { Fragment } from "react";
import { TextField } from '@material-ui/core';

function TextFieldInput(props) {

  const {
    id,
    label,
    defaultValue,
    helperText,
    variant
  } = props

  return (
    <Fragment>
      <TextField
          id={id}
          label={label}
          defaultValue={defaultValue}
          helperText={helperText}
          variant={variant}
        />
    </Fragment>
  )
}

export default TextFieldInput;

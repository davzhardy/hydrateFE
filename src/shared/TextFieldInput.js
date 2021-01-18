import React, { Fragment } from "react";
import { TextField, withStyles } from '@material-ui/core';

const styles = theme => ({
  textInput: {
    borderRadius: 15,
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
  },
});

function TextFieldInput(props) {

  const {
    id,
    label,
    defaultValue,
    type,
    stateSetting,
    helperText,
    variant,
    multiline,
    rows,
    classes
  } = props

  const handleChange = (event) => {
    event.preventDefault();
    stateSetting(event.target.value);
  };

  return (
    <Fragment>
      <TextField
          className={classes.textInput}
          id={id}
          label={label}
          value={defaultValue}
          type={type}
          multiline= {multiline}
          rows = {rows}
          helperText={helperText}
          onChange={handleChange}
          variant={variant}
        />
    </Fragment>
  )
}

export default withStyles(styles, { withTheme: true })(TextFieldInput);

import React, { Fragment } from "react";
import { 
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'

function CustomCheckbox( props ) {

  const { 
    checked,
    handleChange,
    name,
    label,
    color,
     } = props;

  return (
    <Fragment>
      <FormControlLabel
          control={
            <Checkbox
              checked={checked[name]}
              onChange={handleChange}
              name={name}
              color={color}
            />
          }
          label={label}
          labelPlacement="bottom"
        />
    </Fragment>
  )
}

export default CustomCheckbox;
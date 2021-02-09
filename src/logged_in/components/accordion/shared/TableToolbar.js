import React from "react";
import { 
  Toolbar 
} from '@material-ui/core';

function TableToolbar(props) {

  const {
    component
  } = props
  
  return (
    <Toolbar>
      {component}
    </Toolbar>
  )
}

export default TableToolbar;
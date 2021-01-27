import React from "react";
import { 
  Toolbar 
} from '@material-ui/core';

function TableToolbar(props) {

// https://github.com/gregnb/mui-datatables/blob/master/src/components/TableToolbar.js

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
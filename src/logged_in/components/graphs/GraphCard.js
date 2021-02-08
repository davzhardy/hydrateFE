import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { 
  Paper,
  Divider,
  Typography,
  Box
} from '@material-ui/core'

function GraphCard( props ) {

  const { 
    checked,
    data,
    components
  } = props;
  
   if (data.length) {
    return (
      <Fragment>
        <Paper>
          {components.map((el, index) => {
            return ( 
              checked[el[0]] === true ?
                <Fragment>
                  {el[1]}
                  {components.length > 1 && components.length < index ? <Divider/> : null}
                </Fragment>
              : null
            )
          })}
        </Paper>
      </Fragment>
    )
   } else { 
    return (
      <Box style={{width:'100%'}}>
        <Typography align='center'>
          Add some data and your graphs will be displayed here.
        </Typography>
      </Box>
    )
     
   }
}

export default GraphCard;
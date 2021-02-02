import React, { Fragment } from "react";
import { 
  Box, 
  Typography, 
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'

function Summary() {

  return (
    <Fragment>
      <Box mb={4} ml={2} display="flex" flexDirection="column" >
        <Box display="flex" flexDirection="row">
          <Typography variant="h6">
            Key Statistics
          </Typography>
          <List style={{ display: 'flex', flexDirection: 'row' }}>
            <ListItem button>
              <ListItemText primary="Last week" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Last month" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="All time" />
            </ListItem>
          </List>
        </Box>
        <Divider light width="40px" style={{marginTop: '8px'}}/>
        <Typography variant="body1" style={{marginTop: '15px'}}>
          Drinks registered
        </Typography>
        <Typography variant="body1" style={{marginTop: '5px'}}>
          Meals registered
        </Typography>
        <Typography variant="body1" style={{marginTop: '5px'}}>
          Most popular meal
        </Typography>
        <Typography variant="body1" style={{marginTop: '5px'}}>
          Most popular drink
        </Typography>
      </Box>
    </Fragment>
  )
  
}

export default Summary;

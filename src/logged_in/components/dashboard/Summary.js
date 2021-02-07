import React, { Fragment, useState } from "react";
import { 
  Box, 
  Typography, 
  Divider,
  ButtonBase,
  ListItem,
  ListItemText,
  withStyles
} from '@material-ui/core'

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.common.alternative,
    width: "max-content",
    borderRadius: 5,
  },
  list: {
    display: 'flex', 
    flexDirection: 'row', 
    padding: 0, 
    marginLeft: theme.spacing(3), 
    maxHeight: 50
  },
  listItem: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    justifyContent: 'center',
    "&:hover": {
      backgroundColor: theme.palette.secondary.light
    },
    "&:focus": {
      backgroundColor: theme.palette.secondary.main
    }
  },
  listItemTypographySelected : {
    fontWeight: 200,
    justifyContent: 'center',
    borderBottom: `2px solid ${theme.palette.secondary.secondary}`
  },
  listItemTypographySelected: {
    fontWeight: 600,
    justifyContent: 'center',
    borderBottom: `2px solid ${theme.palette.secondary.main}`
  },
  wrapper: {
    margin: theme.spacing(2),
  }
})

function Summary(props) {

  const { 
    summaryMealsData,
    selectedTimeframe,
    setSelectedTimeframe,
    classes 
  } = props;

  const popularMeal = summaryMealsData.popularMeal.charAt(0).toUpperCase() + summaryMealsData.popularMeal.slice(1).toLowerCase()

  return (
    <Fragment>
      <Box className={classes.container} mb={4} ml={2}>
        <Box className={classes.wrapper}>
          <Box display="flex" flexDirection="row" >
            <Typography variant="h6">
              Key Statistics
            </Typography>
            <Box className={classes.list}>
              <ButtonBase 
                className={classes.listItem}
                selected={selectedTimeframe === 'week'}
                onClick={() => {
                  setSelectedTimeframe('week')
                }}
              >
                  <Typography 
                    variant="body2"
                    // className={selected ? classes.listItemTypographySelected : classes.listItemTypography}
                  >
                    Last week
                  </Typography>
              </ButtonBase>
              <ListItem button disableRipple
                className={classes.listItem}
                selected={selectedTimeframe === 'month'}
                onClick={() => {
                  setSelectedTimeframe('month')
                }}
              >
                <ListItemText className={classes.listItemText} primary={
                  <Typography 
                    variant="body2"
                    className={classes.listItemTypography}
                  >
                    Last month
                  </Typography>
                }/>
              </ListItem>
              <ListItem button disableRipple
                className={classes.listItem}
                selected={selectedTimeframe === 'allTime'}
                onClick={() => {
                  setSelectedTimeframe('allTime')
                }}
              >
                <ListItemText className={classes.listItemText} primary={
                  <Typography 
                    variant="body2"
                    className={classes.listItemTypography}
                  >
                    All time
                  </Typography>
                }/>
              </ListItem>
            </Box>
          </Box>
          <Divider light width="40px" style={{marginTop: '8px'}}/>
          <Typography variant="body1" style={{marginTop: '15px'}}>
            Drinks registered
          </Typography>
          <Typography variant="body1" style={{marginTop: '5px'}}>
            Meals registered: {summaryMealsData.mealsRegistered}
          </Typography>
          <Typography variant="body1" style={{marginTop: '5px'}}>
            Most popular dish: {popularMeal}
          </Typography>
          <Typography variant="body1" style={{marginTop: '5px'}}>
            Most popular drink
          </Typography>
        </Box>
      </Box>
    </Fragment>
  )
  
}

export default withStyles(styles, { withTheme: true })(Summary);

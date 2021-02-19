import React, { Fragment } from "react";
import { 
  Box,
  Grid,
  Typography, 
  Divider,
  ButtonBase,
  withStyles
} from '@material-ui/core'

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: '45%',
    backgroundColor: theme.palette.common.alternative,
    borderRadius: 5,
    [theme.breakpoints.down("sm")]: {
      width: "max-content",
    },
  },
  list: {
    display: 'flex', 
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 0, 
    marginLeft: theme.spacing(4), 
  },
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
    justifyContent: 'center',
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
    summaryDrinksData,
    selectedTimeframe,
    setSelectedTimeframe,
    classes 
  } = props;

  const popularMeal = summaryMealsData.popularMeal.charAt(0).toUpperCase() + summaryMealsData.popularMeal.slice(1).toLowerCase()
  const popularDrink = summaryDrinksData.popularDrink.charAt(0).toUpperCase() + summaryDrinksData.popularDrink.slice(1).toLowerCase()

  return (
    <Fragment>
      <Box className={classes.container} mb={4} ml={2}>
        <Box className={classes.wrapper}>
          <Box display="flex" flexDirection="row" >
            <Typography variant="h6" style={{whiteSpace: "nowrap"}}>
              Key Statistics
            </Typography>
            <Grid container spacing={1} className={classes.list}>
            <Grid item>
              <ButtonBase 
                className={classes.listItem}
                onClick={() => {
                  setSelectedTimeframe('week')
                }}
              >
                  <Typography 
                    variant="body2"
                    align='center'
                    selected={selectedTimeframe === 'week'}
                    className={selectedTimeframe === 'week' ? classes.listItemTypographySelected : null}
                  >
                    Last week
                  </Typography>
                  
              </ButtonBase>
              </Grid>
              <Grid item>
              <ButtonBase 
                className={classes.listItem}
                onClick={() => {
                  setSelectedTimeframe('month')
                }}
              >
                  <Typography 
                    variant="body2"
                    selected={selectedTimeframe === 'month'}
                    className={selectedTimeframe === 'month' ? classes.listItemTypographySelected : null}
                    align='center'
                  >
                    Last month
                  </Typography>
              </ButtonBase>
              </Grid>
              <Grid item>
                <ButtonBase
                  className={classes.listItem}
                  onClick={() => {
                    setSelectedTimeframe('allTime')
                  }}
                >
                    <Typography 
                      variant="body2"
                      selected={selectedTimeframe === 'allTime'}
                      className={selectedTimeframe === 'allTime' ? classes.listItemTypographySelected : null}
                      align='center'
                    >
                      All time
                    </Typography>
                </ButtonBase>
              </Grid>
            </Grid>
          </Box>
          <Divider light width="40px" style={{marginTop: '8px'}}/>
          <Typography variant="body1" style={{marginTop: '15px'}}>
            Drinks registered: {summaryDrinksData.drinksRegistered}
          </Typography>
          <Typography variant="body1" style={{marginTop: '5px'}}>
            Meals registered: {summaryMealsData.mealsRegistered}
          </Typography>
          <Typography variant="body1" style={{marginTop: '5px'}}>
            Most popular dish: {popularMeal}
          </Typography>
          <Typography variant="body1" style={{marginTop: '5px'}}>
            Most popular drink: {popularDrink}
          </Typography>
        </Box>
      </Box>
    </Fragment>
  )  
}

export default withStyles(styles, { withTheme: true })(Summary);

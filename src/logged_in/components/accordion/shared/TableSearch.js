import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  Box,
  Tooltip
} from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Searchbar from './Searchbar'

const useStyles = makeStyles(
  theme => ({
    main: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%'
    },
    searchText: {
      flex: '0.8 0',
    },
    clearIcon: {
      '&:hover': {
        color: theme.palette.error.main,
      },
    },
  }),
  { name: 'MUIDataTableSearch' },
);

const TableSearch = (data) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const searchState = useSelector((state) => state.search.mealSearchState)
  const searchQuery = useSelector((state) => state.search.mealSearchValue)

  const setMealSearchState = (input) => {
    dispatch({
      type: "SET_MEALSEARCH_STATE",
      payload: input
    });
  }

  const setMealSearchValue = (input) => {
    dispatch({
      type: "SET_MEALSEARCH_VALUE",
      payload: input
    });
  }

  const openSearchbar = () => {
    setMealSearchState(true)
  }

  const onSearch = event => {
    setMealSearchValue(event.target.value);
  }

  const onHide = () => {
    setMealSearchState(false)
  }

  return (
    <Box className={classes.main}>
      <Tooltip title='Search' arrow >
        <IconButton
          onClick={() => openSearchbar()}
          aria-label="Search"
        >
          <SearchIcon />
        </IconButton>
      </Tooltip>
      {searchState ? <Searchbar searchText={searchQuery} onSearch={onSearch} onHide={onHide} data={data} /> : null}
    </Box>
   
  );
};

export default TableSearch;
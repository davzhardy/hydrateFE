import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  Box,
  Tooltip
} from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Searchbar from '../shared/Searchbar'

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
  const searchState = useSelector((state) => state.search.drinkSearchState)
  const searchQuery = useSelector((state) => state.search.drinkSearchValue)

  const setSearchState = (input) => {
    dispatch({
      type: "SET_DRINKSEARCH_STATE",
      payload: input
    });
  }

  const setSearchValue = (input) => {
    dispatch({
      type: "SET_DRINKSEARCH_VALUE",
      payload: input
    });
  }

  const openSearchbar = () => {
    setSearchState(true)
  }

  const onSearch = event => {
    setSearchValue(event.target.value);
  }

  const onHide = () => {
    setSearchState(false)
    setSearchValue('')
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
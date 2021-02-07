import React, { useState, useEffect } from 'react';
import {
  Grow,
  Box,
  Tooltip
} from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Searchbar from './Searchbar'
import { useDispatch } from 'react-redux'

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
  const [showSearchbar, setShowSearchbar] = useState(false)

  useEffect(() => {
    'mount'
    setShowSearchbar(false)
  }, []);

  const openSearchbar = () => {
    setShowSearchbar(true)
  }

  return (
    <Box className={classes.main}>
      <Tooltip title='Search' arrow >
        <IconButton
          onClick={openSearchbar}
          aria-label="Search"
        >
          <SearchIcon />
        </IconButton>
      </Tooltip>
      {showSearchbar ? <Searchbar searchText={''} onSearch={''} onHide={''} data={data} /> : null}
    </Box>
   
  );
};

export default TableSearch;
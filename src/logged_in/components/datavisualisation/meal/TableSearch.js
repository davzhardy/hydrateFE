import React, { useState } from 'react';
import {
  Grow,
  Box,
  Tooltip
} from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
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

const TableSearch = ({ searchText, onSearch, onHide }) => {
  const classes = useStyles();
  const [showSearchbar, setShowSearchbar] = useState(false)

  const handleTextChange = event => {
    onSearch(event.target.value);
  };

  const onKeyDown = event => {
    if (event.key === 'Escape') {
      onHide();
    }
  };

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
      {showSearchbar ? <Searchbar /> : null}
    </Box>
   
  );
};

export default TableSearch;
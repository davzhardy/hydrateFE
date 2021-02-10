import React, { useState } from 'react';
import {
  Grow,
  Box,
  TextField
} from '@material-ui/core/';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  theme => ({
    main: {
      display: 'flex',
      flexDirection: 'row',
      alignItems:'center',
      [theme.breakpoints.up("xs")]: {
        width: '100%',

      },
      [theme.breakpoints.up("sm")]: {
        width: '75%',
      },
      [theme.breakpoints.up("md")]: {
        width: '50%',
      },
    },
    searchText: {
      flex: '0.8 0',
    },
  }),
  { name: 'MUIDataTableSearch' },
);

const Searchbar = ({ searchText, onHide, data, onSearch }) => {
  const classes = useStyles();
  // const [searchItem, setSearchItem] = useState('') 

  // const handleTextChange = event => {
  //   setSearchItem(event.target.value);
  //   onSearch(searchItem, data);
  // };

  const onKeyDown = event => {
    if (event.key === 'Escape') {
      onHide();
    }
  };

  return (
    <Grow appear in={true} timeout={300}>
      <Box className={classes.main}>
        <TextField
          className={classes.searchText}
          autoFocus={true}
          InputProps={{
            'data-test-id': 'hello',
          }}
          inputProps={{
            'aria-label': 'hello',
          }}
          value={searchText || ''}
          onKeyDown={onKeyDown}
          onChange={onSearch}
          fullWidth={true}
          placeholder={'Search query'}
        />
        <IconButton className={classes.clearIcon} onClick={onHide}>
          <ClearIcon />
        </IconButton>
      </Box>
    </Grow>
  );
};

export default Searchbar;
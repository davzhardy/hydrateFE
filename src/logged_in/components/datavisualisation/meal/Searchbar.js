import React from 'react';
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
      width: '100%'
    },
    searchIcon: {
      color: theme.palette.text.secondary,
      marginTop: '10px',
      marginRight: '8px',
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

const Searchbar = ({ searchText, onSearch, onHide }) => {
  const classes = useStyles();

  const handleTextChange = event => {
    onSearch(event.target.value);
  };

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
              onChange={handleTextChange}
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
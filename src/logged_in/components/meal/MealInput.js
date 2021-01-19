import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputAdornment,
  TextField,
} from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import RestaurantIcon from '@material-ui/icons/Restaurant';

const filter = createFilterOptions();

export default function MealInput(props) {

  const {
    stateSetting,
    defaultValue,
  } = props

  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    setDialogValue('');
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    stateSetting(dialogValue);
    handleClose();
  };

  return (
    <React.Fragment>
      <Autocomplete
        value={defaultValue}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue(newValue);
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue(newValue.inputValue);
          } else {
            stateSetting(newValue.meal);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              meal: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="Meal-Adder"
        options={potentialMeals}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.meal;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(option) => option.meal}
        style={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Meal Type" variant="outlined" 
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <RestaurantIcon 
                      color= "primary"                    />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              )
            }}
          />
        )}
      />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-meal">
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-meal">Add a new meal</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Is there a meal missing from our list? Please, add it!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue}
              onChange={(event) => setDialogValue(...dialogValue, event.target.value)}
              label="Meal"
              type="text"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

const potentialMeals = [
  { meal: 'Breakfast' },
  { meal: 'Lunch' },
  { meal: 'Dinner' },
  { meal: 'Snack' },
];
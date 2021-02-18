import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  InputAdornment,
  TextField,
} from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import TextFieldInput from '../../../shared/TextFieldInput';

const filter = createFilterOptions();

export default function MealAutocomplete(props) {

  const {
    stateSetting,
    potentialMeals,
  } = props

  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    setDialogValue({meal: ''});
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = useState({meal: ''});

  // the value prop for the material ui autocomplete needs to be within the component otherwise it does not recognise the state 
  const [autoCompleteDescription, setAutocompleteDescription] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    stateSetting(dialogValue.meal);
    handleClose();
  };

  return (
    <Grid container spacing={1} >
      <Grid item xs={12}>
        <Autocomplete
          value={autoCompleteDescription}
          onChange={(event, newValue) => {
            if (typeof newValue === 'string') {
              // timeout to avoid instant validation of the dialog's form.
              setTimeout(() => {
                toggleOpen(true);
                setDialogValue({
                  meal: newValue
                });
              });
            } else if (newValue && newValue.inputValue) {
              toggleOpen(true);
              setDialogValue({
                  meal: newValue.inputValue
              });
            } else {
              stateSetting(newValue);
              setAutocompleteDescription(newValue)
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
          style={{ width: '100%'}}
          freeSolo
          renderInput={(params) => (
            <TextFieldInput params={params} label="Meal Type" variant="standard"
              stateSetting={stateSetting}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <RestaurantIcon 
                        color= "primary"
                        fontSize="inherit"
                      />
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
                value={dialogValue.meal}
                onChange={(event) => setDialogValue({...dialogValue, meal: event.target.value})}
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
      </Grid>
    </Grid>
  );
}
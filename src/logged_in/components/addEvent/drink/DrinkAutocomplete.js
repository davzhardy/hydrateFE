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
import { useDispatch } from 'react-redux';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import TextFieldInput from '../../../../shared/TextFieldInput';

const filter = createFilterOptions();

export default function DrinkAutocomplete(props) {

  const {
    stateSetting,
    defaultValue,
    potentialDrinks,
  } = props

  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    console.log('ok')
    setDialogValue('');
    setDialogValue('');
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('here')
    handleAdd(dialogValue)
    stateSetting(dialogValue);
    handleClose();
  };

  const dispatch = useDispatch();

  const handleAdd = (input) => {
    console.log('aaa')
    dispatch({
      type: "UPDATE_POTENTIALMEALS",
      payload: {
        meal: input
      }
    })
  }

  return (
    <Grid container spacing={1} >
      <Grid item xs={12}>
        <Autocomplete
          value={defaultValue}
          onChange={(event, newValue) => {
            if (typeof newValue === 'string') {
              console.log(1)
              // timeout to avoid instant validation of the dialog's form.
              setTimeout(() => {
                toggleOpen(true);
                setDialogValue(newValue);
              });
            } else if (newValue && newValue.inputValue) {
              toggleOpen(true);
              setDialogValue(newValue.inputValue);
            } else {
              stateSetting(newValue.drink);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            if (params.inputValue !== '') {
              filtered.push({
                inputValue: params.inputValue,
                drink: `Add "${params.inputValue}"`,
              });
            }

            return filtered;
          }}
          id="Drink-Adder"
          options={potentialDrinks}
          getOptionLabel={(option) => {
            // e.g value selected with enter, right from the input
            if (typeof option === 'string') {
              return option;
            }
            if (option.inputValue) {
              return option.inputValue;
            }
            return option.drink;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          renderOption={(option) => option.drink}
          style={{ width: '100%'}}
          freeSolo
          renderInput={(params) => (
            <TextFieldInput params={params} label="Drink Type" variant="standard" 
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <FreeBreakfastIcon 
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
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-drink">
          <form 
          // onSubmit={handleSubmit}
          >
            <DialogTitle id="form-dialog-drink">Add a new drink</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Is there a drink missing from the list? Please, add it!
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={dialogValue}
                onChange={(event) => setDialogValue(event.target.value)}
                label="Drink"
                type="text"
              />
            </DialogContent>
            <DialogActions>
              <Button color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary" onClick={() => {
                console.log('hellothere')
                handleSubmit()
              }}>
                Add
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Grid>
    </Grid>
  );
}
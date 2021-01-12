import React from 'react';
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
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';

const filter = createFilterOptions();

export default function DrinkInput() {
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);

  const handleClose = () => {
    setDialogValue({
      drink: '',
    });

    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    drink: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      drink: dialogValue.drink,
    });

    handleClose();
  };

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                drink: newValue,
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              drink: newValue.inputValue,
            });
          } else {
            setValue(newValue);
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
        style={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Drink Type" variant="outlined" 
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <FreeBreakfastIcon 
                      color= "primary"                    />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              )
            }}
          />
        )}
      />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-drink">
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-drink">Add a new drink</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Is there a drink missing from our list? Please, add it!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.drink}
              onChange={(event) => setDialogValue({ ...dialogValue, drink: event.target.value })}
              label="Drink"
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

const potentialDrinks = [
  { drink: 'Water' },
  { drink: 'Black Tea' },
  { drink: 'Herbal Tea' },
  { drink: 'Fruit Juice' },
  { drink: 'Coffee' },
  { drink: 'Fizzy Drink' },
];
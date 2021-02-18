import React, { Fragment } from 'react';
import TextFieldInput from '../../../../shared/TextFieldInput';
import DrinkAutocomplete from './DrinkAutocomplete'

export default function DrinkInput(props) {

  const {
    drinkType,
    setDrink,
    cupsValue,
    setCupsValue,
    volumeValue,
    setVolumeValue,
    time,
    setTime
  } = props

  const potentialDrinks = [
    { drink: 'Water' },
    { drink: 'Black Tea' },
    { drink: 'Herbal Tea' },
    { drink: 'Fruit Juice' },
    { drink: 'Coffee' },
    { drink: 'Fizzy Drink' },
    { drink: 'Ginger & Lemon Tea' },
  ];

  return (
    <Fragment>
        <DrinkAutocomplete 
          defaultValue={drinkType}
          stateSetting = {setDrink}
          potentialDrinks={potentialDrinks}
        />
        <TextFieldInput 
          id={'cups-drunk'}
          label={'Cups'}
          defaultValue={cupsValue}
          stateSetting = {setCupsValue}
          helperText={'How many cups you drank'}
          variant={'standard'}
        />
        <TextFieldInput
          id={'volume-drunk'}
          label={'Volume'}
          defaultValue={volumeValue}
          stateSetting = {setVolumeValue}
          helperText={'How many mililitres you drank'}
          variant={'standard'}
        />
        <TextFieldInput
          id={'time-of-drink'}
          label={'Time'}
          defaultValue={time}
          stateSetting = {setTime}
          type={'datetime-local'}
          variant={'standard'}
          // styles={{height:0}}
        />
    </Fragment>
  );
}


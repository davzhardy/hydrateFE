import React, { Fragment } from "react";
import MealAutocomplete from './MealAutocomplete';
import TextFieldInput from '../../../shared/TextFieldInput';

function MealInputs(props) {

  const {
    description,
    setDescription,
    mealValue,
    setMealValue,
    time,
    setTime
  } = props;

  return (
    <Fragment>
        <MealAutocomplete 
          defaultValue={description}
          stateSetting = {setDescription}
        />
        <TextFieldInput
          id={'meals'}
          label={'Meal'}
          multiline={true}
          rows={2}
          defaultValue={mealValue}
          stateSetting = {setMealValue}
          helperText={'Separate each dish with a comma or an enter'}
          variant={'standard'}
        />
        <TextFieldInput
          id={'time-of-meal'}
          label={'Time'}
          defaultValue={time}
          stateSetting = {setTime}
          type={'datetime-local'}
          variant={'standard'}
      />
    </Fragment>
  )
}

export default MealInputs;
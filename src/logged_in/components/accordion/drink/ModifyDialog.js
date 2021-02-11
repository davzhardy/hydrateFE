import React, { Fragment } from "react";
import FormDialog from '../../../../shared/FormDialog'
import ButtonCircularProgress from "../../../../shared/ButtonCircularProgress";
import {
  Button,
} from "@material-ui/core";
import DrinkInputs from '../../drink/DrinkInput'

function ModifyDialog(props) {

  const {
    selectedRow,
    open,
    handleRowModification,
    onClose,
    description,
    setDescription,
    mealValue,
    setMealValue,
    time,
    setTime,
    isLoading
  } = props
 
  return (
    <Fragment>
      <FormDialog
        open={open}
        onClose={onClose}
        loading={isLoading}
        onFormSubmit={(e) => {
          e.preventDefault();
          handleRowModification(selectedRow, mealValue)
          onClose()
        }}
        hideBackdrop
        headline="Modify your drink"
        content={<DrinkInputs 
          description={description}
          setDescription={setDescription}
          mealValue={mealValue}
          setMealValue={setMealValue}
          time={time}
          setTime={setTime}
        />}
        actions={
          <Fragment>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={isLoading}
              size="large"
            >
              Modify
              {isLoading && <ButtonCircularProgress />}
            </Button>
          </Fragment>
        }
        />
    </Fragment>
  )
}

export default ModifyDialog;

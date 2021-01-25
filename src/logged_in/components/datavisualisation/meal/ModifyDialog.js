import React, { Fragment } from "react";
import FormDialog from '../../../../shared/FormDialog'
import ButtonCircularProgress from "../../../../shared/ButtonCircularProgress";
import {
  Button,
} from "@material-ui/core";

function ModifyDialog(props) {

  const {
    selectedRow,
    open,
    handleRowModification,
    onClose,
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
          handleRowModification(selectedRow)
        }}
        hideBackdrop
        headline="Modify your meal"
        content={'Hello'}
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

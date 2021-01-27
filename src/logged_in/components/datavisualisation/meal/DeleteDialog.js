import React, { Fragment } from "react";
import FormDialog from '../../../../shared/FormDialog'
import { 
  Typography
} from '@material-ui/core'
import ButtonCircularProgress from "../../../../shared/ButtonCircularProgress";
import {
  Button,
} from "@material-ui/core";

function ModifyDialog(props) {

  const {
    selectedRow,
    open,
    handleRowDeletion,
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
          handleRowDeletion(selectedRow)
          onClose()
        }}
        hideBackdrop
        headline="Delete a meal"
        content={
          <Fragment>
            <Typography>
              Are you sure you want to delete this meal?
            </Typography>
          </Fragment>
        }
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
              Delete
              {isLoading && <ButtonCircularProgress />}
            </Button>
          </Fragment>
        }
        />
    </Fragment>
  )
}

export default ModifyDialog;

import React, { Fragment } from "react";
import FormDialog from '../../../../shared/FormDialog'
import {
  Button,
  withStyles,
} from "@material-ui/core";

const styles = (theme) => ({
  link: {
    transition: theme.transitions.create(["background-color"], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut,
    }),
    cursor: "pointer",
    color: theme.palette.primary.main,
    "&:enabled:hover": {
      color: theme.palette.primary.dark,
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark,
    },
  },
});

function InputDialog(props) {
  const { 
    classes,
    missingFields,
    onClose
  } = props;

  return (
    <Fragment>
      <FormDialog
        open
        onClose={onClose}
        onFormSubmit={(e) => {
          e.preventDefault();
          onClose()
        }}
        hideBackdrop
        headline="Please complete further fields to submit your drink"
        content={`Please fill in the ${missingFields.length > 1 ? missingFields.join(", ") : missingFields.join('')} section${missingFields.length > 1 ? 's' :''}`}
        actions={
          <Fragment>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              size="large"
            >
              Close
              {/* {isLoading && <ButtonCircularProgress />} */}
            </Button>
          </Fragment>
        }
        />
    </Fragment>
  )
}

export default withStyles(styles, { withTheme: true })(InputDialog);

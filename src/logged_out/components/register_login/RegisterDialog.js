import React, { useState, useCallback, useRef, Fragment } from "react";
import { useDispatch } from 'react-redux'
import {
  FormHelperText,
  TextField,
  Button,
  Checkbox,
  Typography,
  FormControlLabel,
  withStyles,
} from "@material-ui/core";
import FormDialog from "../../../shared/FormDialog";
import HighlightedInformation from "../../../shared/HighlightedInformation";
import ButtonCircularProgress from "../../../shared/ButtonCircularProgress";
import VisibilityPasswordTextField from "../../../shared/VisibilityPasswordTextField";
import { useMutation } from "react-query";
import { endpoint, mutations, mutateOptions } from '../../../api'

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

function RegisterDialog(props) {
  const { setStatus, theme, onClose, openTermsDialog, status, classes } = props;
  const [hasTermsOfServiceError, setHasTermsOfServiceError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const registerTermsCheckbox = useRef();
  const registerPassword = useRef();
  const registerEmail = useRef();
  const registerUsername = useRef();
  const registerPasswordRepeat = useRef();
  const minimumPasswordLength = 5;
  const dispatch = useDispatch();

  const userMutation = useMutation((newUser) => 
    fetch(endpoint, mutateOptions(newUser))
      .then(res => res.json())
  )

  const register = useCallback( () => {

    const setDialogOpen = (dialog) => {
      dispatch({
        type: "SET_OPEN_DIALOG",
        payload: dialog
      });
    }

    const addNewUser = () => {
      const payload = {
        username: registerUsername.current.value,
        password: registerPassword.current.value,
        email: registerEmail.current.value,
      }
      userMutation.mutate(mutations.CREATE_USER(payload))
    }

    if (!registerTermsCheckbox.current.checked) {
      setHasTermsOfServiceError(true);
      return;
    }
    if (registerPassword.current.value !== registerPasswordRepeat.current.value) {
      setStatus("passwordsDontMatch");
      return;
    }
    if (registerPassword.current.value.length <minimumPasswordLength) {
      setStatus("passwordTooShort");
      return;
    }
    addNewUser()
    if (userMutation.isError) setStatus(null);
    if (userMutation.isSuccess) {
      // need to add logic for cehcking if email was OK etc.
      setStatus('accountCreated')
      setTimeout(() => {
        setDialogOpen('login')
      },2500)
    }
  }, [
    setStatus,
    dispatch,
    userMutation,
    setHasTermsOfServiceError,
    registerPassword,
    registerPasswordRepeat,
    registerTermsCheckbox,
  ]);

  return (
    <FormDialog
      loading={userMutation.isLoading}
      onClose={onClose}
      open
      headline="Register"
      onFormSubmit={(e) => {
        e.preventDefault();
        register();
      }}
      hideBackdrop
      hasCloseIcon
      content={
        <Fragment>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={status === "invalidEmail"}
            label="Email Address"
            autoFocus
            autoComplete="off"
            inputRef={registerEmail}
            type="email"
            onChange={() => {
              if (status === "invalidEmail") {
                setStatus(null);
              }
            }}
            FormHelperTextProps={{ error: true }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            autoComplete="off"
            inputRef={registerUsername}
            FormHelperTextProps={{ error: true }}
          />
          <VisibilityPasswordTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={
              status === "passwordTooShort" || status === "passwordsDontMatch"
            }
            label="Password"
            inputRef={registerPassword}
            autoComplete="off"
            onChange={() => {
              if (
                status === "passwordTooShort" ||
                status === "passwordsDontMatch"
              ) {
                setStatus(null);
              }
            }}
            helperText={(() => {
              if (status === "passwordTooShort") {
                return `Create a password at least ${minimumPasswordLength} characters long.`;
              }
              if (status === "passwordsDontMatch") {
                return "Your passwords dont match.";
              }
              return null;
            })()}
            FormHelperTextProps={{ error: true }}
            isVisible={isPasswordVisible}
            onVisibilityChange={setIsPasswordVisible}
          />
          <VisibilityPasswordTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={
              status === "passwordTooShort" || status === "passwordsDontMatch"
            }
            label="Repeat Password"
            inputRef={registerPasswordRepeat}
            autoComplete="off"
            onChange={() => {
              if (
                status === "passwordTooShort" ||
                status === "passwordsDontMatch"
              ) {
                setStatus(null);
              }
            }}
            helperText={(() => {
              if (status === "passwordTooShort") {
                return "Create a password at least 6 characters long.";
              }
              if (status === "passwordsDontMatch") {
                return "Your passwords dont match.";
              }
            })()}
            FormHelperTextProps={{ error: true }}
            isVisible={isPasswordVisible}
            onVisibilityChange={setIsPasswordVisible}
          />
          <FormControlLabel
            style={{ marginRight: 0 }}
            control={
              <Checkbox
                color="primary"
                inputRef={registerTermsCheckbox}
                onChange={() => {
                  setHasTermsOfServiceError(false);
                }}
              />
            }
            label={
              <Typography variant="body1">
                I agree to the
                <span
                  className={classes.link}
                  onClick={userMutation.isLoading ? null : openTermsDialog}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(event) => {
                    // For screenreaders listen to space and enter events
                    if (
                      (!userMutation.isLoading && event.code === 13) ||
                      event.code === 32
                    ) {
                      openTermsDialog();
                    }
                  }}
                >
                  {" "}
                  terms of service
                </span>
              </Typography>
            }
          />
          {hasTermsOfServiceError && (
            <FormHelperText
              error
              style={{
                display: "block",
                marginTop: theme.spacing(-1),
              }}
            >
              In order to create an account, you have to accept our terms of
              service.
            </FormHelperText>
          )}
          {status === "accountCreated" ? (
            <HighlightedInformation>
              We have successfully created your account. You will be redirected to the login screen shortly.
            </HighlightedInformation>
          ) : 
            <Fragment />}
          {userMutation.isError ? (
            <HighlightedInformation>
              There was an error, please try again.
            </HighlightedInformation>
          ) : 
            <Fragment />}
        </Fragment>
      }
      actions={
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          color="secondary"
          disabled={userMutation.isLoading}
        >
          Register
          {userMutation.isLoading && <ButtonCircularProgress />}
        </Button>
      }
    />
  );
}

export default withStyles(styles, { withTheme: true })(RegisterDialog);

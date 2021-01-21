import React, { useState, useCallback, useRef, Fragment } from "react";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import {
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
import { getUser  } from '../../../api'

const styles = (theme) => ({
  forgotPassword: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    cursor: "pointer",
    "&:enabled:hover": {
      color: theme.palette.primary.dark,
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark,
    },
  },
  disabledText: {
    cursor: "auto",
    color: theme.palette.text.disabled,
  },
  formControlLabel: {
    marginRight: 0,
  },
});

function LoginDialog(props) {
  const {
    setStatus,
    history,
    classes,
    onClose,
    openChangePasswordDialog,
    status,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const loginEmail = useRef();
  const loginPassword = useRef();

  const login = useCallback( async () => {
    setIsLoading(true);
    setStatus(null);
    const userInfo = await getUser({email: loginEmail.current.value, password: loginPassword.current.value})

    if (!userInfo.data.getUser.emailExists) {
      setStatus("invalidEmail");
      setIsLoading(false);
    } else if (!userInfo.data.getUser.passwordMatches) {
      setStatus("invalidPassword");
      setIsLoading(false);
    } else {
      history.push("/a/dashboard");
    }
  }, [setIsLoading, loginEmail, loginPassword, history, setStatus]);

  return (
    <Fragment>
      <FormDialog
        open
        onClose={onClose}
        loading={isLoading}
        onFormSubmit={(e) => {
          e.preventDefault();
          login();
        }}
        hideBackdrop
        headline="Login"
        content={
          <Fragment>
            <TextField
              variant="outlined"
              margin="normal"
              error={status === "invalidEmail"}
              required
              fullWidth
              label="Email Address"
              inputRef={loginEmail}
              autoFocus
              autoComplete="off"
              type="email"
              onChange={() => {
                if (status === "invalidEmail") {
                  setStatus(null);
                }
              }}
              helperText={
                status === "invalidEmail" &&
                "This email address isn't associated with an account."
              }
              FormHelperTextProps={{ error: true }}
            />
            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={status === "invalidPassword"}
              label="Password"
              inputRef={loginPassword}
              autoComplete="off"
              onChange={() => {
                if (status === "invalidPassword") {
                  setStatus(null);
                }
              }}
              helperText={
                status === "invalidPassword" ? (
                  <span>
                    Incorrect password. Try again, or click on{" "}
                    <b>&quot;Forgot Password?&quot;</b> to reset it.
                  </span>
                ) : (
                  ""
                )
              }
              FormHelperTextProps={{ error: true }}
              onVisibilityChange={setIsPasswordVisible}
              isVisible={isPasswordVisible}
            />
            <FormControlLabel
              className={classes.formControlLabel}
              control={<Checkbox color="primary" />}
              label={<Typography variant="body1">Remember me</Typography>}
            />
            {status === "verificationEmailSend" ? (
              <HighlightedInformation>
                We have sent instructions on how to reset your password to your
                email address
              </HighlightedInformation>
            ) : (
              <HighlightedInformation>
                <b>For testing purposes you can use the following account information:</b>
                <br />
                Email is: <b>test@web.com</b>
                <br />
                Password is: <b>HaRzwc</b>
              </HighlightedInformation>
            )}
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
              Login
              {isLoading && <ButtonCircularProgress />}
            </Button>
            <Typography
              align="center"
              className={classNames(
                classes.forgotPassword,
                isLoading ? classes.disabledText : null
              )}
              color="primary"
              onClick={isLoading ? null : openChangePasswordDialog}
              tabIndex={0}
              role="button"
              onKeyDown={(event) => {
                // For screenreaders listen to space and enter events
                if (
                  (!isLoading && event.keyCode === 13) ||
                  event.keyCode === 32
                ) {
                  openChangePasswordDialog();
                }
              }}
            >
              Forgot Password?
            </Typography>
          </Fragment>
        }
      />
    </Fragment>
  );
}

export default withRouter(withStyles(styles)(LoginDialog));

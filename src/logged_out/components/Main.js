import React, {useCallback, memo} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { withStyles } from "@material-ui/core";
import Routing from "./Routing";
import Footer from './footer/Footer'
import NavBar from './navigation/NavBar'
import DialogSelector from "./register_login/DialogSelector";

const styles = (theme) => ({
  wrapper: {
    backgroundColor: theme.palette.common.white,
    overflowX: "hidden",
  },
});

function Main(props) {

  const { classes } = props;

  const dispatch = useDispatch();
  const dialogOpen = useSelector((state) => state.dialog.dialog);

  const setDialogOpen = useCallback((dialog) => {
    dispatch({
      type: "SET_OPEN_DIALOG",
      payload: dialog
    });
  }, [dispatch])

  const openLoginDialog = useCallback(() => {
    setDialogOpen("login");
  }, [setDialogOpen]);

  const openRegisterDialog = useCallback(() => {
    setDialogOpen("register");
  }, [setDialogOpen]);

  const openChangePasswordDialog = useCallback(() => {
    setDialogOpen("changePassword");
  }, [setDialogOpen]);

  const closeDialog = useCallback(() => {
    setDialogOpen(null);
  }, [setDialogOpen]);

  return (
    <div className={classes.wrapper}>
      <DialogSelector
        openLoginDialog={openLoginDialog}
        dialogOpen={dialogOpen}
        onClose={closeDialog}
        // openTermsDialog={openTermsDialog}
        // openRegisterDialog={openRegisterDialog}
        openChangePasswordDialog={openChangePasswordDialog}
      />
      <NavBar 
        openLoginDialog={openLoginDialog}
        openRegisterDialog={openRegisterDialog}
      />
      <Routing />
      <Footer />
    </div>
  )

}

export default withStyles(styles, { withTheme: true })(memo(Main));

import React, {useCallback, useState, memo} from "react";
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
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);

  const setDialogOpen = useCallback((dialog) => {
    dispatch({
      type: "SET_OPEN_DIALOG",
      payload: dialog
    });
  }, [dispatch])

  const openLoginDialog = useCallback(() => {
    setDialogOpen("login");
    setIsMobileDrawerOpen(false);
  }, [setDialogOpen]);

  const openRegisterDialog = useCallback(() => {
    setDialogOpen("register");
    setIsMobileDrawerOpen(false);
  }, [setDialogOpen]);

  const openChangePasswordDialog = useCallback(() => {
    setDialogOpen("changePassword");
  }, [setDialogOpen]);

  const closeDialog = useCallback(() => {
    setDialogOpen(null);
  }, [setDialogOpen]);

  const handleMobileDrawerOpen = useCallback(() => {
    setIsMobileDrawerOpen(true);
  }, [setIsMobileDrawerOpen]);

  const handleMobileDrawerClose = useCallback(() => {
    setIsMobileDrawerOpen(false);
  }, [setIsMobileDrawerOpen]);


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
        selectedTab={selectedTab}
        openLoginDialog={openLoginDialog}
        openRegisterDialog={openRegisterDialog}
        mobileDrawerOpen={isMobileDrawerOpen}
        handleMobileDrawerClose={handleMobileDrawerClose}
        handleMobileDrawerOpen={handleMobileDrawerOpen}
      />
      <Routing />
      <Footer />
    </div>
  )

}

export default withStyles(styles, { withTheme: true })(memo(Main));

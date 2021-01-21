import React, { useState, useCallback, Fragment } from "react";
// import RegisterDialog from "./RegisterDialog";
// import TermsOfServiceDialog from "./TermsOfServiceDialog";
import LoginDialog from "./LoginDialog";
import ChangePasswordDialog from "./ChangePasswordDialog";
import ModalBackdrop from "../../../shared/ModalBackdrop";

function DialogSelector(props) {
  const {
    dialogOpen,
    // openTermsDialog,
    // openRegisterDialog,
    openLoginDialog,
    openChangePasswordDialog,
    onClose,
  } = props;
  const [loginStatus, setLoginStatus] = useState(null);
  // const [registerStatus, setRegisterStatus] = useState(null);

  const _onClose = useCallback(() => {
    setLoginStatus(null);
    // setRegisterStatus(null);
    onClose();
  }, [onClose, setLoginStatus]);

  const printDialog = useCallback(() => {
    switch (dialogOpen) {
      // case "register":
      //   return (
      //     <RegisterDialog
      //       onClose={_onClose}
      //       openTermsDialog={openTermsDialog}
      //       status={registerStatus}
      //       setStatus={setRegisterStatus}
      //     />
      //   );
      // case "termsOfService":
      //   return <TermsOfServiceDialog onClose={openRegisterDialog} />;
      case "login":
        return (
          <LoginDialog
            onClose={_onClose}
            status={loginStatus}
            setStatus={setLoginStatus}
            openChangePasswordDialog={openChangePasswordDialog}
          />
        );
      case "changePassword":
        return (
          <ChangePasswordDialog
            setLoginStatus={setLoginStatus}
            onClose={openLoginDialog}
          />
        );
      default:
    }
  }, [
    dialogOpen,
    openChangePasswordDialog,
    openLoginDialog,
    // openRegisterDialog,
    // openTermsDialog,
    _onClose,
    loginStatus,
    // registerStatus,
    setLoginStatus,
    // setRegisterStatus,
  ]);

  return (
    <Fragment>
      {dialogOpen && <ModalBackdrop open />}
      {printDialog()}
    </Fragment>
  );
}

export default DialogSelector;

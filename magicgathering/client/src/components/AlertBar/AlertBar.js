import React from "react";
import Alert from "react-bootstrap/Alert";

import "bootstrap/dist/css/bootstrap.min.css";

function AlertBar({
  isOnModal = false,
  handleClose,
  message,
  variant = "danger",
}) {
  const handleCloseAlert = () => {
    handleClose(false);
  };
  console.log(isOnModal);
  //setTimeout(handleCloseAlert, 3000);
  return (
    <Alert
      key={variant}
      variant={variant}
      onClose={handleCloseAlert}
      dismissible
    >
      {message}
    </Alert>
  );
}

export default AlertBar;

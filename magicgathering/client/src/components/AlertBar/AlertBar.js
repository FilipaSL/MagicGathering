import React from "react";
import Alert from "react-bootstrap/Alert";

import "bootstrap/dist/css/bootstrap.min.css";

function AlertBar({ handleClose, message, variant }) {
  const handleCloseAlert = () => {
    handleClose(false);
  };
  setTimeout(handleCloseAlert, 2000);
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
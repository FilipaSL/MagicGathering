import React from "react";
import Alert from "react-bootstrap/Alert";

import "bootstrap/dist/css/bootstrap.min.css";

function AlertBar({ show, handleClose, message, variant }) {
  if (show) {
    return (
      <Alert
        key={variant}
        variant={variant}
        onClose={() => handleClose(false)}
        dismissible
      >
        {message}
      </Alert>
    );
  }
}

export default AlertBar;

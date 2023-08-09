import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert, { AlertColor } from "@mui/lab/Alert";
import { Slide } from "@material-ui/core";
export const withSnackbar = WrappedComponent => {
  return (props) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("I'm a custom snackbar");
    const [duration, setDuration] = useState(2000);
    const [severity, setSeverity] = useState<AlertColor>("success"); /** error | warning | info */

    const showMessage = (message, severity:AlertColor = "success", duration = 2000) => {
      setMessage(message);
      setSeverity(severity);
      setDuration(duration);
      setOpen(true);
    };

    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setOpen(false);
    };

    return (
      <>
        <WrappedComponent {...props} snackbarShowMessage={showMessage} />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          autoHideDuration={duration}
          open={open}
          onClose={handleClose}
          TransitionComponent={Slide}
        >
          <Alert variant="filled"  severity={severity??"success"}>
            {message}
          </Alert>
        </Snackbar>
      </>
    );
  };
};
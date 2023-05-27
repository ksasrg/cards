import MuiAlert, { AlertProps } from "@mui/material/Alert/Alert";
import Snackbar from "@mui/material/Snackbar/Snackbar";
import { appActions } from "app/app.slice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { forwardRef, useEffect, useState } from "react";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function AppSnackbar() {
  const appError = useAppSelector((state) => state.app.error);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (appError) {
      setError(appError);
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [appError, dispatch]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(appActions.setError({ error: null }));
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  );
}

import { useTheme } from "@emotion/react";
import { Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { forwardRef, useState } from "react";
import { tokens } from "../theme";
import { useSnackBarContext } from "../hooks/useSnackBarContext";


export default function SnackBar() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {visible, message, hideSnack} = useSnackBarContext();

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        hideSnack();
      };


    return (
        <Snackbar open={visible} autoHideDuration={4000} onClose={handleClose} >
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%',backgroundColor: colors.greenAccent[400] }}>
                {message}
            </Alert>
        </Snackbar>
      
    )
}

import { Snackbar, Alert } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"

function SnackbarAlert() {
    const {
        openSnackbar,
        alertString,
        alertSeverity
    } = useSelector((reduxData) => reduxData.reducers);

    const dispatch = useDispatch();

    const handleSnackBarClose = () => {
        dispatch({
            type: "OPEN_SNACKBAR",
            payload: {
                openSnackbar: false,
                alertString: ""
            }
        });
        dispatch({
            type: "ALERT_SEVERITY",
            payload: {
                alertSeverity: "error"
            }
        });
    }
    return (
        <>
            <Snackbar 
            anchorOrigin={{ vertical: "top", horizontal: "center" }} 
            open={openSnackbar} 
            autoHideDuration={2000} 
            onClose={handleSnackBarClose}>
                <Alert severity={alertSeverity} sx={{ width: '100%' }}>
                    {alertString}
                </Alert>
            </Snackbar>
        </>
    )
}

export default SnackbarAlert;
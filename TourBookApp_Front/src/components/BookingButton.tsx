import { useAuth0 } from "@auth0/auth0-react";
import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import SaveIcon from '@mui/icons-material/Save';
import UserProfileForm, { UserFormData } from "../forms/UserProfileForm";
import { useGetUser } from "../api/UserApi";
import { useState } from "react";

type Props ={
    onBooking: (userFormData: UserFormData) => void;
    disabled: boolean;
}

const BookingButton = ({onBooking, disabled}:Props)=>{

    const {isAuthenticated, isLoading:isAuthLoading, loginWithRedirect} = useAuth0();
    const {pathname} = useLocation();

    const {currentUser, isLoading: isGetUserLoading} = useGetUser();

    const onLogin = async ()=>{
        await loginWithRedirect({
            appState:{
                returnTo:pathname
            }
        })
    }
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    if(!isAuthenticated){
        return(
            <>
                <Button onClick={onLogin} type="submit" variant="contained" fullWidth >Log in to Booking</Button>
            </>
        )
    }
    if(isAuthLoading || !currentUser){
        return(
            <LoadingButton loading
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined">Log in to Booking
            </LoadingButton>
        )
    }

    return (
        <div>
          <Button variant="contained" disabled={disabled} onClick={handleClickOpen}>
            Go to Booking
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Booking Details</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <UserProfileForm
                  currentUser={currentUser}
                  onSave={onBooking}
                  isLoading={isGetUserLoading} 
                  buttonLabel="Continue to payment"
                  formTitle=""
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              {/* <Button variant="contained" onClick={onBooking}>
                Continue to payment
              </Button> */}
            </DialogActions>
          </Dialog>
        </div>
      );

}

export default BookingButton;
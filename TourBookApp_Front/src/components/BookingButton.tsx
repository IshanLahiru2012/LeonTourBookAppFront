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
    isLoading: boolean;
}

const BookingButton = ({onBooking, disabled, isLoading:isBookingLoading}:Props)=>{

    const {isAuthenticated, isLoading:isAuthLoading, loginWithRedirect} = useAuth0();
    const {pathname} = useLocation();

    const {currentUser, isLoading: isUserLoading} = useGetUser();

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
          <Button variant="contained" disabled={disabled} onClick={handleClickOpen} fullWidth>
            Booking
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Booking Details</DialogTitle>
            <DialogContent>
                <UserProfileForm
                  currentUser={currentUser}
                  onSave={onBooking}
                  isUserLoading={isUserLoading} 
                  isBookingLoading={isBookingLoading}
                  buttonLabel="Confirm Booking"
                  formTitle=""
                />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </div>
      );

}

export default BookingButton;
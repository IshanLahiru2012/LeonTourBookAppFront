import { Grid, Typography } from "@mui/material";
import { Booking } from "../type";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { AspectRatio } from "@mui/joy";

type Props ={
    booking : Booking;
}
const BookingStatusContent = ({booking}:Props) => {

    const getTourCharge = ()=>{
        return booking.bookingDetails.distance * booking.transfer.vehicleTypes[parseInt(booking.vehicleTypeIndex)].pricePerKm;
    }

    return(
        <>
        <Grid container justifyContent={"space-between"} py={1}>
            <Grid item xs={12} md={6} container px={2}  rowSpacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h6" fontSize={12}> 
                        <LocationOnIcon color="success"/>
                        Pick up Location
                    </Typography>
                    <Typography fontSize={12} px={1}>{booking.userDetails.name}</Typography>
                    <Typography fontSize={11} px={1}>
                        {booking.userDetails.addressLine1}, {booking.userDetails.city}
                    </Typography>
                </Grid> 
                <Grid item xs={12}>
                    <Typography variant="h6" fontSize={12}> 
                        <DirectionsCarIcon color="success"/>
                        Transfer Vehicle Details
                    </Typography>
                    <Typography fontSize={11} px={1}>Vehicle Type  {'>'} {booking.transfer.vehicleTypes[parseInt(booking.vehicleTypeIndex)].vehicleCategory}</Typography>
                    <Typography fontSize={11} px={1}>Vehicle Color {'>'} {booking.bookingDetails.color}</Typography>
                </Grid> 
                <Grid item xs={12}>
                    <Typography variant="h6" fontSize={12}> 
                        <BookOnlineIcon color="success"/>
                        Booking Details
                    </Typography>
                    <Typography fontSize={11} px={1}>Tour Distance  {'>'} {booking.bookingDetails.distance}</Typography>
                    <Typography fontSize={11} px={1}>Tour Charge {'>'} Rs. {getTourCharge()}</Typography>
                    <Typography fontSize={11} px={1}>Tour Date {'>'} {booking.bookingDetails.date.split('T')[0]}</Typography>
                    <Typography fontSize={11} px={1}>Tour Time {'>'} {booking.bookingDetails.time}</Typography>
                </Grid>
            </Grid>
            <Grid item xs={12} md={6} container px={2} justifyContent={"end"}>
                <img
                    alt="Vehicle Image"
                    src={booking.transfer.vehicleTypes[parseInt(booking.vehicleTypeIndex)].vehicleImageUrl}
                    className="rounded-md object-cover max-h-[200px] max-w-[300px]"
                  />
            </Grid>

        </Grid>
        
        </>
    )

}

export default BookingStatusContent;
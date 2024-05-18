import { Divider, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { Booking, BookingStatus } from "../type";
import { useUpdateBookingStatus } from "../api/OwnTransferApi";
import { useEffect, useState } from "react";
import { Booking_Status } from "../config/booking-status-config";
import { SelectChangeEvent } from "@mui/material/Select";

type Props = {
    booking : Booking;
}
const BookingCard =({booking}:Props)=>{
    const {updateBooking,isLoading} = useUpdateBookingStatus();

    const [ status , setStatus] = useState<BookingStatus>(booking.status);

    useEffect(()=>{
        setStatus(booking.status);
    },[booking.status])

    const handleBookingStatus = (event:SelectChangeEvent<typeof booking.status>) =>{
        const newStatus = event.target.value as BookingStatus;
        updateBooking({bookingId: booking._id , status : newStatus});
        setStatus(newStatus as BookingStatus);        
    }
    return(
        <>
            <Grid container p={2} rowSpacing={1}>
                <Grid item xs={12} sm={6} lg={3}>
                    <Typography variant="h6" fontSize={11}>
                        Customer Name : <span className="text-amber-800">{booking.userDetails.name}</span>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <Typography variant="h6" fontSize={11}>
                        Customer Address : <span className="text-amber-800">
                            {booking.userDetails.addressLine1},{booking.userDetails.city}</span>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <Typography variant="h6" fontSize={11}>
                        Date & Time : <span className="text-amber-800">
                            {booking.bookingDetails.date.split('T')[0]} | {booking.bookingDetails.time}</span>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <Typography variant="h6" fontSize={11}>
                        Vehicle Type & Color : <span className="text-amber-800">
                            {booking.transfer.vehicleTypes[parseInt(booking.vehicleTypeIndex)].vehicleCategory} | {booking.bookingDetails.color}</span>
                    </Typography>
                </Grid>
                <Grid item xs={12} >
                    <Typography variant="h6" fontSize={11}>
                        Tour Charge : Rs. <span className="text-amber-800">
                            {(booking.transfer.vehicleTypes[parseInt(booking.vehicleTypeIndex)].pricePerKm * booking.bookingDetails.distance).toFixed(2)}</span>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                <Grid item xs={12}>
                    <Typography sx={{pb:1}} variant="h6" fontSize={13}>Update here Booking Status</Typography>
                    <FormControl fullWidth >
                        <InputLabel id="status" >Status</InputLabel>
                        <Select
                            labelId="status"
                            label="Status"
                            value={status}
                            onChange={handleBookingStatus}
                            disabled={isLoading}
                        >
                            {Booking_Status.map((status) => (
                            <MenuItem key={status.value} value={status.value}>{status.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>                  
            </Grid>
        </>
    )

}

export default BookingCard;
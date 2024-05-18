import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { Booking } from "../type";
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { Booking_Status } from "../config/booking-status-config";
import { get } from "react-hook-form";

type Props = {
    booking: Booking;
}
const BookingStatusTitle = ({booking}:Props)=>{

    const getPlacedTime = ()=>{
        const placedTime = new Date(booking.createdAt);
        return placedTime.toISOString().split('T')[1].substring(0,5);
    }
    
    const getPreparedTime = ()=>{
        const placedTime = new Date(booking.createdAt);
        placedTime.setMinutes(placedTime.getMinutes()+ booking.transfer.estimatedArrivalTime);
        return placedTime.toISOString().split('T')[1].substring(0,5);      
    }

    const getBookingStatus = ()=>{
        return Booking_Status.find((book)=> book.value === booking.status) || Booking_Status[0];
    }
    console.log(getBookingStatus()?.progressValue);
    

    return(
        <>
            <Grid container justifyContent={"space-between"} px={2}  rowSpacing={1}>
                    <Grid item xs={12} container direction={"column"}>
                        <Typography  fontSize={9}>Booking Id : <span className="text-amber-800" >{booking._id}</span> </Typography> 
                        <Typography fontSize={9}>Place On : <span className="text-amber-800">{booking.createdAt.split('T')[0]}</span></Typography> 
                    </Grid>
                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={12} md={6}>
                        <Typography  variant="h6" fontSize={12}>Booking Status : <span className="text-green-400">{booking.status}</span> </Typography>
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress sx={{ backgroundColor:'lightcyan'}} variant="determinate" value={getBookingStatus()?.progressValue} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} container alignItems={"end"} direction={"column"} >
                        <Typography variant="h6" fontSize={12}> Booking placed at : {getPlacedTime()}</Typography>
                        <Typography variant="h6" fontSize={12}>Transfer Ready by : {getPreparedTime()}</Typography>
                    </Grid>
                    
                </Grid>
        </>
    )

}

export default BookingStatusTitle;
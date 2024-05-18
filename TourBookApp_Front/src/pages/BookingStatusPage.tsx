import { Grid, Paper } from "@mui/material";
import { useGetBookings } from "../api/BookingApi";
import BookingStatusTitle from "../components/BookingStatusTitle";
import BookingStatusContent from "../components/BookingStatusContent";

const BookingStatusPage = ()=>{

    const {bookings, isLoading} = useGetBookings();

    if(isLoading){
        return "Loading..."
    }

    if(!bookings || bookings.length ===0){
        return "No Bookings found";
    }

    return(
        <>
        
        <Grid container rowSpacing={2} >
            {bookings.map((booking,index)=>(
                <Paper sx={{m:1, py:1}} key={index}>
                    <Grid item container >
                        <Grid item xs={12}>
                            <BookingStatusTitle booking={booking}/>
                        </Grid>
                        <Grid item xs={12}>
                            <BookingStatusContent booking={booking}/>
                        </Grid>
                    </Grid>
                </Paper>
                

            ))}
            

            
        </Grid>

        </>
    )
}

export default BookingStatusPage;
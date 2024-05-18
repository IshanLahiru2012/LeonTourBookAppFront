import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { Booking } from "../type";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type BookingRequest = {
    bookingDetails:{
        date : Date;
        time : string;
        distance: number;
        color: string;
    };
    userDetails:{
        email: string;
        name: string;
        addressLine1: string;
        city: string;
        country: string;
    },
    transferId: string;
    vehicleTypeIndex: number;
  

};

export const useCreateBooking = ()=>{
    const {getAccessTokenSilently} = useAuth0();

    const createBookingRequest = async (bookingRequest:BookingRequest)=>{
        const accessToken = await getAccessTokenSilently();

        const resp = await fetch(`${API_BASE_URL}/api/v1/booking/create-booking`,
            {
            method:"POST",
            headers:{
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookingRequest)
        });

        if(!resp.ok){
            throw new Error("Unable to Place Booking")
        }
        console.log(resp);
        
        return resp.json();
    };

    const {
        mutate: createBooking,
        isLoading,
        error,
        reset

        } = useMutation(createBookingRequest);

    if(error){
        toast.error(error.toString());
        reset();
    }
    
    return{
        createBooking,
        isLoading
    }
    
}

export const useGetBookings = ()=>{
    const {getAccessTokenSilently} = useAuth0();

    const getBookingsRequest = async ():Promise<Booking[]>=>{
        const accessToken = await getAccessTokenSilently();

        const resp = await fetch(`${API_BASE_URL}/api/v1/booking`,{
            headers:{
                Authorization: `Bearer ${accessToken}`,
            }
        });
        if(!resp.ok){
            throw new Error("Failed to get bookins");
        }
        return resp.json();
    };

    const {data:bookings, isLoading} = useQuery("fetchBookings", getBookingsRequest,{refetchInterval:5000});

    return {bookings, isLoading}
}
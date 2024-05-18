import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { Transfer } from "../type";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetTransfer = ()=>{
    const {getAccessTokenSilently} = useAuth0();
    const getTransferRequest = async (): Promise<Transfer> =>{
        const accessToken = await getAccessTokenSilently();

        const resp = await fetch(`${API_BASE_URL}/api/v1/transfer`,{
            method:"GET",
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        });

        if(!resp.ok){
            throw new Error("Fialed to get transfer");
        }
        return resp.json();
    };

    const {data: transfer, isLoading} = useQuery("fetchTransfer", getTransferRequest);

    return {transfer, isLoading};
}

export const useCreateTransfer = () =>{
    const {getAccessTokenSilently} = useAuth0();

    const createTransferRequest = async(transferFormData: FormData):Promise<Transfer[]>=>{
        const accessToken = await getAccessTokenSilently();

        const resp = await fetch(`${API_BASE_URL}/api/v1/transfer`,{
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
              
            },
            body:transferFormData
        });
        if(!resp.ok){
            throw new Error("Fialed to create transfer");
        }
        return resp.json();
    };

    const {
        mutate:crateTransfer,
        isLoading,
        isSuccess,
        error
        } = useMutation(createTransferRequest);
    
    if(isSuccess){
        toast.success('Transfer created');
    }
    if(error){
        toast.error("Unable to Update Transfer");
    }
    return{crateTransfer, isLoading}
};

export const useUpdateTransfer = ()=>{
    const {getAccessTokenSilently} = useAuth0();

    const updateTransferRequest = async (transferFormData:FormData): Promise<Transfer>=>{
        const accessToken = await getAccessTokenSilently();

        const resp = await fetch(`${API_BASE_URL}/api/v1/transfer`,{
            method:"PUT",
            headers:{
                Authorization: `Bearer ${accessToken}`
            },
            body: transferFormData
        });

        if(!resp){
            throw new Error("Failed to update transfer");
        }
        return resp.json();
    }

    const {mutate: updateTransfer, isLoading, isSuccess, error } = useMutation(updateTransferRequest);

    if(isSuccess){
        toast.success("Transfer Updated");
    }
    if(error){
        toast.error("Unable to update transfer");
    }

    return {updateTransfer, isLoading};
};

export const useGetTransferBooking = ()=>{
    const {getAccessTokenSilently} = useAuth0();

    const getTransferBookingRequest = async ()=>{
        const accessToken = await getAccessTokenSilently();

        const resp = await fetch(`${API_BASE_URL}/api/v1/transfer/booking`,{
            headers:{
                Authorization: `Bearer ${accessToken}`,
                "Content-type": "application/json"
            }
        });
        if(!resp.ok){
            throw new Error("Failed to fetch Bookings");
        }
        return resp.json();
    }

    const {data: bookings, isLoading} = useQuery("fetchTransferBookings", getTransferBookingRequest);
    return {bookings, isLoading};
}

type UpdateBookingStatusRequest={
    bookingId: string;
    status: string;
}
export const useUpdateBookingStatus = ()=>{
    const {getAccessTokenSilently} = useAuth0();

    const updateBookingStatus = async (updateBookingStatusRequest:UpdateBookingStatusRequest)=>{
        const accessToken = await getAccessTokenSilently();
        const resp = await fetch(`${API_BASE_URL}/api/v1/transfer/booking/${updateBookingStatusRequest.bookingId}/status`,{
            method: "PATCH",
            headers:{
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({status: updateBookingStatusRequest.status})
        });
        
        if(!resp.ok){
            throw new Error("Failed to update status");
        }
        return resp.json();
    };
    const {mutateAsync: updateBooking, isLoading, isError, isSuccess, reset} = useMutation(updateBookingStatus);

    if(isSuccess){
        toast.success("Booking updated");
    }
    if(isError){
        toast.error("Unable to update booking");
        reset();
    }
    return {updateBooking, isLoading};
}
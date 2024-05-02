import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Transfer } from "../type";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
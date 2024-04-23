import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { User } from "../type";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetUser = () => {
    const {getAccessTokenSilently} = useAuth0();

    const getUserRequest = async (): Promise<User> =>{
        const accessToken = await getAccessTokenSilently();

        const resp = await fetch(`${API_BASE_URL}/api/v1/user`,{
            method:'GET',
            headers:{
                Authorization:`Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
        });
        if(!resp.ok){
            throw new Error('Failed to fetch user');
        }

        return resp.json();
    }
    const {
        data: currentUser,
        isLoading,
        error
    } = useQuery("fetchCurrentUser", getUserRequest);

    if(error){
        toast.error(error.toString());
    }
    return{
        currentUser,
        isLoading
    }
}

type CreateUserReq = {
    auth0Id: string;
    email: string;
}

export const useCreateUser = () =>{
    const {getAccessTokenSilently} = useAuth0(); 

    const createUserReq = async (user: CreateUserReq)=>{
        const accessToken = await getAccessTokenSilently();
        const res = await fetch(`${API_BASE_URL}/api/v1/user`,{
            method:"POST",
            headers:{
                Authorization:`Bearer ${accessToken}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify(user)
        });
        if(!res.ok){
            throw new Error("Failed to create user");
        };
    };
    const {
        mutateAsync: createUser,
        isLoading,
        isError,
        isSuccess
    } = useMutation(createUserReq);

    return {
        createUser,
        isLoading,
        isError,
        isSuccess
    }
};

type UpdateUserRequest={
    name: string;
    addressLine1: string;
    city: string;
    country: string;
}

export const useUpdateUser = ()=>{
    const {getAccessTokenSilently} = useAuth0();
    const updateUserRequest = async (formData: UpdateUserRequest)=>{
        const accessToken = await getAccessTokenSilently();
        const resp = await fetch(`${API_BASE_URL}/api/v1/user`,{
            method: "PUT",
            headers:{
                Authorization: `Bearer ${accessToken}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify(formData)
        });
        if(error){
            throw new Error("Failed to update user");
        }
        return resp.json();

    };

    const {
        mutateAsync: updateUser,
        isLoading,
        isSuccess,
        isError,
        error,
        reset
     } = useMutation(updateUserRequest);
     
    return {
        updateUser,
        isLoading
    }
}
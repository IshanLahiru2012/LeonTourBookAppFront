import { z } from "zod";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { Button, Container, TextField, Typography} from "@mui/material";
import { useEffect} from "react";
import { User } from "../type";
import { fieldNames } from "../config/transfer-options-config";
import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';
import { blue, green } from "@mui/material/colors";

const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(2,"name is required"),
    addressLine1: z.string().min(1,"Address Line 1 is required"),
    city: z.string().min(1,"City is required"),
    country: z.string().min(1,"Country is required")
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
    currentUser: User;
    onSave: (userFormData: UserFormData) => void;
    isUserLoading:boolean;  
    isBookingLoading?: boolean;
    formTitle?: string;
    buttonLabel?: string;
}

const UserProfileForm = ({onSave,isUserLoading,isBookingLoading, currentUser, formTitle="User Profile Form",buttonLabel="Submit"}:Props) => {

    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: currentUser

    });
    const {register,handleSubmit, formState} = form;

    useEffect(()=>{
        form.reset(currentUser);
    },[currentUser, form])
    
    
    return(
        <Container >
            <form onSubmit={handleSubmit(onSave)} className="space-y-4 bg-gray-100 rounded-lg md:p-10 px-2">
                <div>
                    <Typography variant="h4" component="div" color={blue[400]} >{formTitle}</Typography>
                    <Typography>View and change your profile information here</Typography>
                </div>
                {fieldNames.map((field) => (
                    <TextField
                        key={field}
                        label={field}
                        type={field === "email" ? "email" : "text"}
                        id={field}
                        {...register(field)}
                        error={!!formState.errors[field]}
                        helperText={formState.errors[field]?.message}
                        required = {field !== "email"}
                        disabled = {field === "email"}
                        fullWidth
                        sx={{backgroundColor:"white"}}
                        // fullWidth={!(!isMobile && (field==="addressLine1" || field==="city" || field==="country"))}
                                                                      
                    />
                ))}
                
                <div className="pb-4 flex justify-end">
                    {isUserLoading || isBookingLoading ?
                    <LoadingButton loading
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="outlined">{buttonLabel}
                    </LoadingButton>:
                    <Button sx={{ textTransform: 'none' }} variant="contained" type="submit"  >{buttonLabel}</Button>}   
                </div>
               
            </form>            
        </Container>
    )
};

export default UserProfileForm;


import { any, string, z } from "zod";
import { UseFormProps, useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { Button, Container, FormControl, Input, TextField, Typography} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { User } from "../type";

const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(2,"name is required"),
    addressLine1: z.string().min(1,"Address Line 1 is required"),
    city: z.string().min(1,"City is required"),
    country: z.string().min(1,"Country is required")
});

type UserFormData = z.infer<typeof formSchema>;

type Props = {
    currentUser: User;
    onSave: (userFormData: UserFormData) => void;
    isLoading:boolean;  
}

const UserProfileForm = ({onSave,isLoading, currentUser}:Props) => {

    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: currentUser

    });
    const {register,handleSubmit, formState} = form;

    useEffect(()=>{
        form.reset(currentUser);
    },[currentUser, form])

    
    // const onSubmitForm = async (data: UserFormData)=>{
    //     try{
    //         console.log("Submitted data: ",data)
    //         alert("Form Submitted successfully");
    //         form.reset();

    //     } catch(error){
    //         console.error("Form Submition error: ",error);
    //     }finally{
    //         setIsLoading(false);
    //     }  

    // }
    // const [isLoading, setIsLoading] = useState(false);
    // const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 768px)").matches);

    // useEffect(()=>{
    //     const handleDisplay = ()=>{
    //         setIsMobile(window.matchMedia("(max-width: 768px)").matches)
    //     }
    //     window.addEventListener('resize', handleDisplay);
    // },[]);
    
    const fieldNames: ("email" | "name" | "addressLine1" | "city" | "country")[] = ['email', 'name', 'addressLine1', 'city', 'country'];
    
    return(
        <Container >
           <div>
            <form onSubmit={handleSubmit(onSave)} className="space-y-4 bg-gray-100 rounded-lg md:p-10 px-2">
                <div>
                    <h2 className="text-2xl font-bold">User Profile Form</h2>
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
                {/* <TextField
                    label="email"
                    type="text"
                    id="email"
                    {...form.register("email")}
                    error={!!form.formState.errors.email}
                    helperText={form.formState.errors.email?.message}
                    required
                    fullWidth
                />
                <TextField
                    label="name"
                    type="text"
                    id="name"
                    {...form.register("name")}
                    error={!!form.formState.errors.name}
                    helperText={form.formState.errors.name?.message}
                    required
                    fullWidth
                />
                <TextField
                    label="addressLine1"
                    type="text"
                    id="addressLine1"
                    {...form.register("addressLine1")}
                    error={!!form.formState.errors.addressLine1}
                    helperText={form.formState.errors.addressLine1?.message}
                    required
                    fullWidth
                />
                <TextField
                    label="city"
                    type="text"
                    id="city"
                    {...form.register("city")}
                    error={!!form.formState.errors.city}
                    helperText={form.formState.errors.city?.message}
                    fullWidth 
                    required 
                />
                <TextField
                    label="country"
                    type="text"
                    id="country"
                    {...form.register("country")}
                    error={!!form.formState.errors.country}
                    helperText={form.formState.errors.country?.message}
                    fullWidth 
                    required
                /> */}
                <div className="pb-4 flex justify-end">
                <Button variant="contained" type="submit" >Submit</Button>
                </div>
               
            </form>
           </div>

           {/* <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
           {isLoading ? <CircularProgress size={24} color="secondary" /> : "Submit"}
         </Button> */}
           
           

        </Container>
    )
};

export default UserProfileForm;


import { TextField, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

const TransferDetails = ()=>{
    const {register,formState} = useFormContext();
    return(
        <>
        <div className="space-y-4">
            <div>
                <h2 className="text-2xl font-bold text-cyan-600">Tranfer Details</h2>
                <Typography>View and change your profile information here</Typography>
            </div>
            <div className="flex flex-col gap-6">
                <TextField
                    label="Transfer Name"
                    type="text"
                    id="transferName"
                    sx={{backgroundColor:"white"}}
                    {...register("transferName")}
                    error={!!formState.errors['transferName']}
                    required
                    fullWidth
                />
                <TextField
                    label="City"
                    type="text"
                    id="city"
                    sx={{backgroundColor:"white"}}
                    {...register("city")}
                    error={!!formState.errors['city']}
                    required
                    fullWidth
                />
                <TextField
                    label="Estimated Arrival Time (minutes)"
                    type="number"
                    id="estimatedArrivalTime"
                    sx={{backgroundColor:"white"}}
                    {...register("estimatedArrivalTime")}
                    error={!!formState.errors['estimatedArrivalTime']}
                    required
                    className="max-w-[40%]"
                    inputProps={{min:1}}
                    
                />
            </div>
            
        </div>
        </>
    )
}

export default TransferDetails;
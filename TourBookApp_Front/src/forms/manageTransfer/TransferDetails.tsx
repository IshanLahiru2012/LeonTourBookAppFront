import { Button, FormControl, FormHelperText, Grid, TextField, Typography} from "@mui/material";
import { ReactNode, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisuallyHiddenInput from '@mui/icons-material';
import { blue, green } from "@mui/material/colors";
import { transferFormData } from "../../config/transferDataType";

const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      console.log("Selected file:", selectedFile);
      // Further processing of the file, like uploading to a server
    }
  };

const TransferDetails = ()=>{
    const {register,formState:{errors},control} = useFormContext<transferFormData>();
    const [imageUrl, setImageUrl] = useState('');
    return(
        <>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <h2 className="text-2xl font-bold text-cyan-600">Transfer Details</h2>
                <Typography>View and change your profile information here</Typography>
            </Grid>
            <Grid item xs={12} >
                <FormControl error={!!errors.transferName} fullWidth>
                    <TextField
                        label="Transfer Name"
                        type="text"
                        id="transferName"
                        sx={{backgroundColor:"white"}}
                        {...register("transferName")}
                        error={!!errors['transferName']}
                        required  
                    />
                    {errors.transferName && (
                    <FormHelperText>{errors.transferName?.message}</FormHelperText>
                    )}
                </FormControl>
            </Grid>
            {/* className="flex flex-col gap-6" */}
            <Grid item xs={12}>
                <FormControl error={!!errors.city} fullWidth>
                    <TextField
                        label="City"
                        type="text"
                        id="city"
                        sx={{backgroundColor:"white"}}
                        {...register("city")}
                        error={!!errors.city}
                        required
                        
                    />
                    {errors.city && (
                    <FormHelperText>{errors.city?.message}</FormHelperText>
                    )}
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl error={!!errors.estimatedArrivalTime} fullWidth>
                    <TextField
                        label="Estimated Arrival Time (minutes)"
                        type="number"
                        id="estimatedArrivalTime"
                        sx={{backgroundColor:"white"}}
                        {...register("estimatedArrivalTime")}
                        error={!!errors.estimatedArrivalTime}
                        required
                        inputProps={{min:1}} 
                    />
                    {errors.estimatedArrivalTime && (
                    <FormHelperText>{errors.estimatedArrivalTime?.message}</FormHelperText>
                    )}
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography>Upload Transfer Image</Typography>
                <FormControl error={!!errors.transferImageUrl} fullWidth>
                    <Controller
                        name={'transferImageUrl'}
                        control={control}
                        render={({field}) =>(
                            <Button
                            component="label" // Button acts as a label for the hidden input
                            variant="contained"
                            sx={{backgroundColor:green[200]}}
                            startIcon={<CloudUploadIcon />}
                            
                            >
                            <input
                                type="file"
                                // onChange={handleFileChange} // Event handler for file selection
                                accept=".jpg, .jpeg, .png,"
                                onChange={(event)=>{
                                    field.onChange(event.target.files ? event.target.files[0]:null)
                                    if(event.target.files?.[0]){
                                        setImageUrl(URL.createObjectURL(event.target.files[0]));
                                    }else{
                                        setImageUrl('');
                                    }
                                }}
                            />
                        </Button>
                        )}
                        />
                        {errors.transferImageUrl && (
                        <FormHelperText>{errors.transferImageUrl?.message}</FormHelperText>
                        )}
                </FormControl>
            </Grid>
            {imageUrl && (
            <Grid item xs={12} md={12}>
                <img src={imageUrl} alt="Transfer Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
            </Grid>)}
            
        </Grid>
        </>
    )
}

export default TransferDetails;
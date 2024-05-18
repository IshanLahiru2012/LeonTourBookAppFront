import { Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Controller, FieldErrors, useFormContext } from "react-hook-form";
import { categoryList, colorList } from "../../config/transfer-options-config";
import { blue, green, orange, pink } from "@mui/material/colors";
import { transferFormData } from "../../config/transferDataType";
import { useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

type Props ={
    index : number;
    removeVehicleType: ()=> void;
}

const VehicleTypesInput = ({index, removeVehicleType}:Props)=>{

    const {control, formState:{errors},watch} = useFormContext<transferFormData>();
    const existingImageUrl = watch(`vehicleTypes.${index}.vehicleImageUrl`);

    const [imageUrl, setImageUrl] = useState<string|undefined>();   

    return(
        <Paper elevation={3} sx={{m:1}}>
            <Grid container spacing={2} sx={{ paddingTop: 2 , paddingX:2}}>
                <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!errors.vehicleTypes?.[index]?.vehicleCategory}>
                    <InputLabel >Vehicle Category</InputLabel>
                    <Controller
                    name={`vehicleTypes.${index}.vehicleCategory`}
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label="Vehicle Category"
                            sx={{backgroundColor:"white"}} 
                            autoWidth
                            MenuProps={{style:{maxHeight:400}}}
                        >   
                            {categoryList.map((item)=>(
                                <MenuItem value={item} key={item}>{item}</MenuItem>
                            ))}
                        </Select>
                    )}
                    />
                    {errors.vehicleTypes?.[index]?.vehicleCategory && (
                    <FormHelperText>{errors.vehicleTypes[index]?.vehicleCategory?.message}</FormHelperText>
                    )}
                </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormControl fullWidth error={!!errors.vehicleTypes?.[index]?.pricePerKm}>
                        <Controller
                        name={`vehicleTypes.${index}.pricePerKm`}
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...field}
                            error={!!errors.vehicleTypes?.[index]?.pricePerKm}
                            label="Price Per Km"
                            type="number"
                            sx={{backgroundColor:"white"}} 
                            />
                        )}
                        />
                        {errors.vehicleTypes?.[index]?.pricePerKm && (
                        <FormHelperText>{errors.vehicleTypes[index]?.pricePerKm?.message}</FormHelperText>
                        )}
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormControl fullWidth error={!!errors.vehicleTypes?.[index]?.numOfSeats}>
                        <Controller
                        name={`vehicleTypes.${index}.numOfSeats`}
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...field}
                            error={!!errors.vehicleTypes?.[index]?.numOfSeats}
                            label="Num Of Seats"
                            type="number"
                            sx={{backgroundColor:"white"}} 
                            />
                        )}
                        />
                        {errors.vehicleTypes?.[index]?.numOfSeats && (
                        <FormHelperText>{errors.vehicleTypes[index]?.numOfSeats?.message}</FormHelperText>
                        )}
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormControl fullWidth error={!!errors.vehicleTypes?.[index]?.manufacYear}>
                        <Controller
                        name={`vehicleTypes.${index}.manufacYear`}
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...field}
                            error={!!errors.vehicleTypes?.[index]?.manufacYear}
                            label="Manufacture Year"
                            type="number"
                            sx={{backgroundColor:"white"}} 
                            />
                        )}
                        />
                        {errors.vehicleTypes?.[index]?.manufacYear && (
                        <FormHelperText>{errors.vehicleTypes[index]?.manufacYear?.message}</FormHelperText>
                        )}
                    </FormControl>
                </Grid>
                <Grid item xs={12} >
                    <Typography>Available Vehicle Colors</Typography>
                    <Controller 
                    name={`vehicleTypes.${index}.color`}
                    control={control}
                    render={({ field}) => {
                        return (
                        <FormControl  
                            error={!!errors.vehicleTypes?.[index]?.color} 
                            >
                            <Grid container >
                                {colorList.map((colorItem:string, colorIndex) => (
                                    <Grid item xs={12} sm={4} md={3} lg={2} key={colorIndex}>
                                        <FormControlLabel
                                            control={
                                            <Checkbox
                                                checked={field.value.includes(colorItem)}
                                                sx={{color: pink[800], '&.Mui-checked': {color: green[400]} }}
                                                onChange={(event) => {
                                                const isChecked = event.target.checked;
                                                    if (isChecked) {
                                                        field.onChange([...field.value, colorItem]);                                    
                                                    } else {
                                                        field.onChange(field.value.filter((c:string) => c !== colorItem));
                                                    }
                                                }}
                                            />
                                            }
                                            label={colorItem}
                                        />
                                    </Grid>                        
                                ))}
                            </Grid>
                            <FormHelperText>
                            {errors.vehicleTypes?.[index]?.color?.message}
                            </FormHelperText>
                        </FormControl>
                        );
                    }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography>Upload Vehicle Image</Typography>
                    <FormControl error={!!errors.vehicleTypes?.[index]?.vehicleImageUrl} fullWidth >
                        <Controller
                        name={`vehicleTypes.${index}.vehicleImageUrl`}
                        control={control}
                        render={({field}) =>(
                            <Button
                            component="label" // Button acts as a label for the hidden input
                            variant="contained"
                            sx={{backgroundColor:blue[200]}}
                            startIcon={<CloudUploadIcon />}
                            
                            >
                            <input
                                type="file"
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
                        {errors.vehicleTypes?.[index]?.vehicleImageUrl && (
                        <FormHelperText>{errors.vehicleTypes[index]?.vehicleImageUrl?.message}</FormHelperText>
                        )}
                    </FormControl>
                </Grid>
                {(imageUrl || existingImageUrl) && (
                <Grid item xs={12} md={12}>
                    <img src={imageUrl || `${existingImageUrl}`} alt="Transfer Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                </Grid>)}

                <Grid item xs={12} md={12} pb={2}>
                    <Grid container justifyContent="end">
                        <Button variant="contained" color="error" onClick={removeVehicleType}>
                            Remove Vehicle
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
        
        
    
    )

}

export default VehicleTypesInput;
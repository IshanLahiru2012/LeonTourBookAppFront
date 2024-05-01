import { Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Controller, useFieldArray, useFormContext } from "react-hook-form"
import { colorList } from "../../config/transfer-options-config";
import { green, brown, blue, orange } from "@mui/material/colors";
import { transferFormData } from "../../config/transferDataType";
import { useEffect } from "react";
import VehicleTypesInput from "./VehicleTypesInput";


const VehicleTypes = () =>{
    const {control,formState: { errors } } = useFormContext();
  
    const { fields, append, remove } = useFieldArray({
        control,
        name: "vehicleTypes",
      });

    
    

    return(
      
        <>
            <div>
                <div>
                    <Typography variant="h6" color={green[600]}>Vehicle Types</Typography>
                    <Typography>View and change your vehicle information here</Typography>
                </div>
                <div >
                    <FormControl error={!!errors.vehicleTypes} >
                        <Grid container >
                            {fields.map((field, index) => (
                                <VehicleTypesInput
                                    key={field.id}
                                    index={index}
                                    removeVehicleType={() => remove(index)}
                                />
                            ))}
                        </Grid>
                    </FormControl>
                    <Button type="button" 
                            variant="contained"
                            sx={{backgroundColor: brown[500],
                                '&:hover': {backgroundColor: blue[700],}}}
                            onClick={()=>append({ 
                                vehicleCategory: '', 
                                pricePerKm: 0, 
                                color: [], 
                                vehicleImageUrl: null, 
                                numOfSeats: 0, 
                                manufacYear: 0 })}
                            >+Add Vehicle Types
                    </Button>
                </div>
            </div>
        </>
    );
};

export default VehicleTypes;
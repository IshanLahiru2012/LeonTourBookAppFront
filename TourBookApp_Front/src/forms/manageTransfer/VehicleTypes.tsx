import { Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form"
import { colorList } from "../../config/transfer-options-config";
import { green, pink } from "@mui/material/colors";

const VehicleTypes = () =>{
    const {register,watch} = useFormContext();

    const selectedColors = watch('')

    return(
        <>
        <div className="space-y-4" >
            <div>
                <h2 className="text-2xl font-bold text-cyan-600">Vehicle Types</h2>
                <Typography>View and change your vehicle information here</Typography>
            </div>
            <div className="border p-2">
                <h4>Available Vehicle colors</h4>
                <div className="grid md:grid-cols-5 sm:grid-cols-3 gap-1">
                    {colorList.map((colorItem)=>(
                        <FormControlLabel 
                            key={colorItem}
                            {...register(colorItem)}
                            control={
                                <Checkbox sx={{color: pink[800], '&.Mui-checked': {color: green[600]} }} />
                            } 
                            label={colorItem} 
                        /> 
                    ))}
                </div>
            </div>  
        </div>
        </>
    )
}

export default VehicleTypes;
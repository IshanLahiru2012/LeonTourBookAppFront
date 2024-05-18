import { Button, Container, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { Transfer } from "../../type";
import { date, z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from "react";
import { green } from "@mui/material/colors";
import BookingButton from "../../components/BookingButton";
import { UserFormData } from "../UserProfileForm";
import { useCreateBooking } from "../../api/BookingApi";
import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';

type Props = {
    transfer: Transfer;
    selectedIndex : number;
}

const formSchema = z.object({
    date: z.date().min(new Date((new Date()).toISOString().split('T')[0]),"Date should be today or later"),
    distance : z.coerce.number().min(20, "Distance shouldn't be less than 20 km"),
    time: z.string().min(1,"Time should be selected"),
    color : z.string().min(1,"Color should be selected")
});

type bookingFormData = z.infer<typeof formSchema>


const BookingTransferForm = ({transfer,selectedIndex}:Props) =>{

    const storedDataFetch = sessionStorage.getItem(`data-${transfer._id}-${selectedIndex}`);
    const storedData = storedDataFetch ? JSON.parse(storedDataFetch):"";

    const form = useForm<bookingFormData>({
        resolver : zodResolver(formSchema),
        defaultValues:{
            date: storedData? new Date(storedData.date) : new Date(),
            distance: storedData? storedData.distance : 20,
            time: "",
            color :storedData? storedData.color :transfer.vehicleTypes[selectedIndex || 0].color[0]
        }

    })
    const {control,register,handleSubmit, formState:{errors}, reset,getValues} = form;
    const [tourCharge, setTourCharge] = useState<number>(parseFloat((getValues("distance")*transfer.vehicleTypes[selectedIndex].pricePerKm).toFixed(2)))
    const {createBooking, isLoading} = useCreateBooking();

    const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setTourCharge(parseInt(event.target.value)*transfer.vehicleTypes[selectedIndex].pricePerKm)
    }
    const onSubmit = (data:bookingFormData)=>{
        sessionStorage.setItem(`data-${transfer._id}-${selectedIndex}`,JSON.stringify(data));
        console.log(data)
    }
    const onBooking = async (userFormData: UserFormData)=>{
        sessionStorage.setItem(`data-${transfer._id}-${selectedIndex}`,JSON.stringify(getValues()));
        if(!transfer){
            return;
        }

        const bookingData ={
            bookingDetails:{
                date : getValues("date"),
                time : getValues("time"),
                distance: getValues("distance"),
                color: getValues("color"),
            },
            userDetails:{
                email: userFormData.email as string,
                name: userFormData.name,
                addressLine1: userFormData.addressLine1,
                city: userFormData.city,
                country: userFormData.country,
            },
            transferId: transfer._id,
            vehicleTypeIndex: selectedIndex,
        }
        createBooking(bookingData);
                
    }

    useEffect(() => {
        reset({
            date:storedData? new Date(storedData.date) : getValues("date"),
            distance:storedData? storedData.distance : getValues("distance"),
            time: getValues("time"),
            color:storedData? storedData.color : transfer.vehicleTypes[selectedIndex || 0].color[0]
        });
        
        setTourCharge(parseFloat((getValues("distance")*transfer.vehicleTypes[selectedIndex].pricePerKm).toFixed(2)))
        
    }, [selectedIndex]);


    return(
        <>
            <Paper  sx={{marginTop:2}} elevation={4}>
                <Typography variant="h6" px={2} color={green[400]}>Booking Form</Typography>
                <Typography variant="body2" px={2}>Place your Booking information here</Typography>
                <form onSubmit={handleSubmit(onSubmit)} >
                <Grid container p={2} columnSpacing={1} rowSpacing={2}>
                    
                    <Grid item xs={12} md={6}>
                        <Controller 
                            name="date"
                            control={control}
                            render={({ field }) => (
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <FormControl fullWidth error={!!errors.date} >
                                        <DatePicker
                                            {...field}
                                            label="Date" 
                                            value={field.value ? dayjs(field.value) : null}
                                            minDate={dayjs(new Date())}
                                            onChange={(newValue) => field.onChange(newValue ? newValue.toDate() : null)}
                                            
                                        />
                                        {!!errors.date && <FormHelperText>{errors.date.message}</FormHelperText>}
                                    </FormControl>
                                    
                                </LocalizationProvider>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller 
                            name="time"
                            control={control}
                            render={({ field }) => (
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <FormControl fullWidth error={!!errors.time} >
                                        <TimePicker
                                            {...field}
                                            label="Time"
                                            value={field.value ? dayjs(field.value) : null}
                                            onChange={(newValue) => field.onChange(newValue?.format("HH:mm"))   }
                                        />
                                        {!!errors.time && <FormHelperText>{errors.time.message}</FormHelperText>}
                                    </FormControl>    
                                </LocalizationProvider>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth error={!!errors.color}>
                            <InputLabel >Vehicle Color</InputLabel>
                                <Controller
                                    name="color"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Vehicle Color"
                                            sx={{backgroundColor:"white"}} 
                                            
                                            autoWidth
                                            MenuProps={{style:{maxHeight:400}}}
                                        >   
                                        {transfer.vehicleTypes[selectedIndex].color.map((item)=>(
                                        <MenuItem value={item} key={item}>{item}</MenuItem>
                                    ))}
                                </Select>
                            )}
                            />
                            {errors.color && (
                            <FormHelperText>{errors.color.message}</FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth error={!!errors.distance}>
                            <TextField
                                {...register("distance")}
                                type="number"
                                label="Distance (km)"
                                error={!!errors.distance}
                                helperText={errors.distance?.message}
                                onChange={handleDistanceChange}
                                />
                        </FormControl>

                    </Grid>
                    <Grid item xs={12} md={12} >
                        <Paper sx={{p:2, bgcolor:green[50]}} >
                            <Grid container justifyContent={"space-between"} >
                                <Typography >Approximate Tour charge </Typography>
                                <Typography >:  Rs. {tourCharge}</Typography>
                            </Grid>
                            
                        </Paper>
                        
                    </Grid>
                </Grid>
                {isLoading ?
                    <LoadingButton loading
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="outlined">Log in to Booking
                    </LoadingButton> :
                    <Grid p={2}>
                        <BookingButton disabled={false} onBooking={onBooking} isLoading={isLoading}/>
                    </Grid>
                }
                
                
                {/* <Grid p={2}>
                    <Button type="submit" variant="contained" fullWidth >Booking</Button>
                </Grid> */}
                
            </form>
            </Paper>
            
        </>
    )

}

export default BookingTransferForm;
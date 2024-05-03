import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, Divider } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import TransferDetails from "./TransferDetails";
import VehicleTypes from "./VehicleTypes";
import { formSchema, transferFormData } from "../../config/transferDataType";
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { Transfer } from "../../type";
import { useEffect } from "react";


type Props = {
    transfer?: Transfer;
    onSave: (transferFormData : FormData)=> void;
    isLoading: boolean;
};

const ManageTransfeForm = ({transfer, onSave,isLoading}:Props)=>{
    const form = useForm<transferFormData>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            transferName:"Anex Transfer",
            city:"colombo",
            estimatedArrivalTime:0,
            vehicleTypes:[{
                vehicleCategory:"",
                pricePerKm:0,
                color:[],
                numOfSeats:4,
                manufacYear:2000
            }]
        }
    });

    const { handleSubmit, reset} = form;

    useEffect(()=>{
        if(!transfer){
            return;
        }

        reset(transfer);

        console.log( transfer);

    },[reset, transfer])

    const onSubmit = (dataJson:transferFormData)=>{
        const formData = new FormData;
        formData.append("transferName", dataJson.transferName);
        formData.append("city", dataJson.city);
        formData.append("estimatedArrivalTime", dataJson.estimatedArrivalTime.toString());
        if(dataJson.transferImageUrl){
            formData.append("transferImageUrl", dataJson.transferImageUrl);
        }
        dataJson.vehicleTypes.forEach((vehicleType, index)=>{
            formData.append(`vehicleTypes[${index}][vehicleCategory]`,vehicleType.vehicleCategory);
            formData.append(`vehicleTypes[${index}][pricePerKm]`,vehicleType.pricePerKm.toString());
            formData.append(`vehicleTypes[${index}][numOfSeats]`,vehicleType.numOfSeats.toString());
            formData.append(`vehicleTypes[${index}][manufacYear]`,vehicleType.manufacYear.toString());
            formData.append(`vehicleTypes[${index}][vehicleImageUrl]`,vehicleType.vehicleImageUrl);
            vehicleType.color.map((colorItem,index2)=>{
                formData.append(`vehicleTypes[${index}][color][${index2}]`,colorItem);
            })
        });
        onSave(formData);
    }

 

    return(
        <>
        <Container >
            <FormProvider {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-gray-50 rounded-lg md:p-10 px-2">
                    <TransferDetails/>
                    <Divider/>
                    <VehicleTypes/>
                    <div className="pb-4 flex justify-end">
                        {isLoading ?
                        <LoadingButton loading
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="outlined">Submit
                        </LoadingButton>:
                        <Button variant="contained" type="submit">Submit</Button>}
                    </div>
                </form>
            </FormProvider>
        </Container>
        </>
    )
}
export default ManageTransfeForm;
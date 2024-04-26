import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, Divider } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import TransferDetails from "./TransferDetails";
import VehicleTypes from "./VehicleTypes";

const formSchema = z.object({

    transferName : z.string({
        required_error:"transferName is required"}),
    city : z.string({
        required_error:"city is required"}),
    estimatedArrivalTime : z.coerce.number({
        required_error:"estimatedArrivalTime is required",
        invalid_type_error:"must be a valid number"}),
    vehicleTypes : z.array(z.object({
        vehicleCategory : z.string().min(1,"vehicleCategory is required"),
        pricePerKm : z.coerce.number().min(1,"pricePerKm is required"),
        color : z.array(z.string()).nonempty({
            message: "please select at least one color"
        }),
        vehicleImageUrl: z.instanceof(File,{message: "vehicle image is required " }),
        NumOfSeats : z.coerce.number().min(1,"NumOfSeats is required"),
        manufacYear : z.coerce.number().min(1,"manufacYear is required"),
    })),
    transferImageUrl: z.instanceof(File,{message: "transfer image is required " })


})

type transferFormData = z.infer<typeof formSchema>;

type Props = {
    onSave: (transferFromData : FormData)=> void;
    isLoading: boolean;
};

const ManageTransfeForm = ({onSave,isLoading}:Props)=>{
    const form = useForm<transferFormData>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            vehicleTypes:[{
                vehicleCategory:"",
                pricePerKm:0,
                color:[],
                NumOfSeats:0,
                manufacYear:0
            }]
        }
    });
    const {register, handleSubmit, formState} = form

    const onSubmit = (formDataJson: transferFormData)=>{

    }

    const as = ()=>{
        console.log(form)
    }

    return(
        <>
        <Container >
            <FormProvider {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-gray-100 rounded-lg md:p-10 px-2">
                    <TransferDetails/>
                    <Divider/>
                    <VehicleTypes/>
                    <div className="pb-4 flex justify-end">
                        <Button variant="contained" type="submit"  onClick={as}>Submit</Button>
                    </div>
                </form>
            </FormProvider>
        </Container>
        </>
    )
}
export default ManageTransfeForm;
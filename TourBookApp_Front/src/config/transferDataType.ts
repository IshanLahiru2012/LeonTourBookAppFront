import { z } from "zod";

export const formSchema = z.object({

    transferName : z.string({
        required_error:"transferName is required"}).min(2,"transferName is required"),
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
        numOfSeats : z.coerce.number().min(1,"NumOfSeats is required"),
        manufacYear : z.coerce.number().min(1,"manufacYear is required"),
    })),
    transferImageUrl: z.instanceof(File,{message: "transfer image is required " })


})

export type transferFormData = z.infer<typeof formSchema>;
import { z } from "zod";

const fileOrStringSchema = z.union([
    z.instanceof(File, { message: 'Must be a file and image is required ' }),
    z.string().url({ message: 'Must be a valid URL' }),
  ]);

export const formSchema = z.object({

    transferName : z.string().min(2,"transferName is required"),
    city : z.string().min(2,"city is required"),
    estimatedArrivalTime : z.coerce.number({
        required_error:"estimatedArrivalTime is required",
        invalid_type_error:"must be a valid number"}),
    vehicleTypes : z.array(z.object({
        vehicleCategory : z.string().min(1,"vehicleCategory is required"),
        pricePerKm : z.coerce.number().min(1,"pricePerKm is required"),
        color : z.array(z.string()).nonempty({
            message: "please select at least one color"
        }),
        vehicleImageUrl: fileOrStringSchema,
        numOfSeats : z.coerce.number().min(1,"NumOfSeats is required"),
        manufacYear : z.coerce.number().min(1,"manufacYear is required"),
    })),
    transferImageUrl: fileOrStringSchema
});

export type transferFormData = z.infer<typeof formSchema>;
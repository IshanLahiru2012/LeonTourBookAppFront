import { z } from "zod";

const formSchema = z.object({
    transferName : z.string({required_error:"transferName is required"}),
    city : z.string({required_error:"city is required"}),
    estimatedArrivalTime : z.coerce.number({required_error:"estimatedArrivalTime is required",invalid_type_error:"must be a valid number"}),
    

})

type Props = {
    onSave: (transferFromData : FormData)=> void;
    isLoading: boolean;
};

const ManageTransfeForm = ({onSave,isLoading}:Props){

}
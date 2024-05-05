import { zodResolver } from "@hookform/resolvers/zod";
import { ReorderRounded, Search } from "@mui/icons-material";
import { Button, FormControl, Grid, Input, TextField, dividerClasses } from "@mui/material";
import { green } from "@mui/material/colors";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    searchQuery: z.string({
        required_error: "Transfer name is required"
    })
});

export type SearchFrom = z.infer<typeof formSchema>

type Props = {
    onSubmit: (formData: SearchFrom)=> void;
    placeHolder: string;
    onReset?: () => void;
}

const SearchBar = ({onSubmit,placeHolder,onReset}:Props)=>{
    const form = useForm<SearchFrom>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchQuery:""
        }
    });

    const handleReset = ()=>{
        form.reset({
            searchQuery:""
        });
        if(onReset){
            onReset(); 
        }
    };

    return(
        <>
        <Grid {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} 
                className="flex items-center flex-1 gap-3 justify-between flex-row border-2 rounded-full p-2 mx-5">
                <Search className="ml-1 text-green-500 hidden md:block"/>
                <FormControl>
                    <Controller
                        name="searchQuery"
                        control={form.control}
                        render={({field})=>(
                            <Input
                                {...field}
                                className="border-none outline-none text-xl focus:ring-0"
                                placeholder={placeHolder}
                            />
                        )}
                    />
                </FormControl>
                {form.formState.isDirty && (<Button type="button" onClick={handleReset} variant="outlined">Clear</Button>)}
                <Button type="submit" sx={{backgroundColor:green[300], borderRadius:5, ':hover':{backgroundColor:green[500]}, color:"white" }}>Search</Button>
            </form>
        </Grid>

        </>
    )

}

export default SearchBar;
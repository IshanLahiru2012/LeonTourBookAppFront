import { zodResolver } from "@hookform/resolvers/zod";
import { RoundedCorner, Search } from "@mui/icons-material";
import { Button, FormControl, FormHelperText, Grid, Input, TextField, dividerClasses } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect } from "react";

const formSchema = z.object({
    searchQuery: z.string().min(2,"Either city or town should be provide")
});

export type SearchFrom = z.infer<typeof formSchema>

type Props = {
    onSubmit: (formData: SearchFrom)=> void;
    placeHolder: string;
    onReset?: () => void;
    searchQuery?: string
}

const SearchBar = ({onSubmit,placeHolder,onReset,searchQuery}:Props)=>{
    const form = useForm<SearchFrom>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchQuery:""
        }
    });

    useEffect(()=>{
        form.reset({ searchQuery })
    },[form, searchQuery])

    const handleReset = ()=>{
        form.reset({
            searchQuery:""
        });
        if(onReset){
            onReset(); 
        }
    };
    const {handleSubmit,formState,control} = form

    return(
        <>
        <Grid alignItems="center">
            <form onSubmit={handleSubmit(onSubmit)} 
                className={`flex items-center gap-3  border-2 rounded-full p-2 mx-5 ${formState.errors.searchQuery && "border-red-500"}`}>
                <Search className="ml-1 text-green-500 hidden md:block"/>
                <FormControl className="flex-1" >
                    <Controller
                        name="searchQuery"
                        control={control}
                        render={({field})=>(
                            <Input
                                {...field}
                                className="border-none outline-none text-xl focus:ring-0"
                                placeholder={placeHolder}
                                disableUnderline
                                
                            />
                        )}
                    />
                </FormControl>
                
                {/* {form.formState.isDirty && ( */}
                <Button type="button" onClick={handleReset} sx={{paddingX:0,borderRadius:5}}><ClearIcon >Clear</ClearIcon></Button>
                {/* )} */}
                <Button type="submit" sx={{backgroundColor:green[300], borderRadius:5, ':hover':{backgroundColor:green[500]}, color:"white" }}>Search</Button>
            </form>
            {formState.errors.searchQuery && <FormHelperText sx={{color:red[500] ,textAlign: "center",}}>{formState.errors.searchQuery.message}</FormHelperText>}
        </Grid>

        </>
    )

}

export default SearchBar;
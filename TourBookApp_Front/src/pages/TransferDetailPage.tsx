import { useParams } from "react-router-dom"
import { useGetSelectedTransfer } from "../api/TransferApi";
import { Button, Grid, Typography } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import VehicleCard from "../components/VehicleCard";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BookingTransfeForm from "../forms/bookingTransfer/BookingTransfer";
import { useEffect, useState } from "react";



const TransferDetailPage = ()=>{

    const {transferId} = useParams();
    const {transfer, isLoading} = useGetSelectedTransfer(transferId);

    const [selectedIndex, setSelectedIndex] = useState<number>(()=>{
        const indexS = sessionStorage.getItem(`${transferId}-selectedIndex`);
        return indexS ? parseInt(indexS):0;
    })

    const handleSelectIndex = (index:number)=>{
        setSelectedIndex(index);
    }
    
    useEffect(()=>{
        sessionStorage.setItem(`${transferId}-selectedIndex`, JSON.stringify(selectedIndex));
    },[selectedIndex])

    if(isLoading || !transfer){
        return "Loading..."
    }

    

    
    

    return(
        <>
            <Grid container >
                <Grid item xs={12} sx={{padding:2}}>
                    <AspectRatio ratio={16/6}>
                        <img
                            alt="Transfer Image"
                            src={transfer.transferImageUrl}
                            className="rounded-md w-full  object-cover hover:cursor-pointer "       
                        />
                    </AspectRatio>
                    <Typography variant="h6" pt={2}  >
                        {transfer.transferName}
                    </Typography>
                    <Typography variant="subtitle1" pl={1} >
                        {transfer.city}
                    </Typography>
                    <Typography variant="body2" component="div">
                        <AccessTimeIcon /> 
                        ready in {transfer.estimatedArrivalTime} mins
                    </Typography>
                </Grid>
                <Grid item xs={12} container rowSpacing={2} columnSpacing={2}>
                    <Grid item xs={12} lg={8}>
                    <VehicleCard transfer={transfer} selectedIndex={selectedIndex} handleSelectIndex={handleSelectIndex}/>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                       <BookingTransfeForm  transfer={transfer} selectedIndex={selectedIndex} />
                    </Grid>
                </Grid>
            </Grid>
        </>
    )

}

export default TransferDetailPage;
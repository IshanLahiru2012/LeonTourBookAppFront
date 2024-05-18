import React from "react";
import { useCreateTransfer, useGetTransfer, useGetTransferBooking, useUpdateTransfer } from "../api/OwnTransferApi";
import ManageTransfeForm from "../forms/manageTransfer/ManageTransferForm"
import { Container, Paper, Tab, Tabs, Typography } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { Booking } from "../type";
import BookingCard from "../components/BookingCard";

const ManageTransferPage = ()=>{
    const {crateTransfer, isLoading: isCreateLoading} = useCreateTransfer();
    const {transfer} = useGetTransfer();
    const {updateTransfer, isLoading: isUploadLoading} = useUpdateTransfer();

    const {bookings}= useGetTransferBooking();

    const [value, setValue] = React.useState("booking");

    const isEditing = !!transfer;

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return(
        <>
            <TabContext value={value} >
                <Tabs value={value} onChange={handleChange} sx={{px:4}}>
                    <Tab label="Booking" value="booking"/>
                    <Tab label="Transfer Details" value="manage-transfer" />   
                </Tabs>
                <TabPanel value="booking">
                    <Container>
                        <Typography sx={{pb:2}}><span className="text-green-600">{bookings?.length ? bookings?.length:0}</span> Active Bookings</Typography>
                        {bookings?.map((booking:Booking)=>(
                            <Paper key={booking._id} sx={{mb:3}} elevation={3}>
                                 <BookingCard booking={booking}/>
                            </Paper>
                        ))}

                    </Container>

                </TabPanel>
                <TabPanel value="manage-transfer">
                    <ManageTransfeForm 
                        transfer={transfer} 
                        onSave={isEditing ? updateTransfer: crateTransfer} 
                        isLoading={isCreateLoading|| isUploadLoading}/>
                </TabPanel>
            </TabContext>
            
        </>
    )
}
export default ManageTransferPage;
import { BookingStatus } from "../type";

type BookingState = {
    label: string;
    value: BookingStatus;
    progressValue: number;
}

export const Booking_Status : BookingState[] =[

    {label:"placed", value: "placed", progressValue:40 },
    {label:"confirmed", value: "confirmed", progressValue:25 },
    {label:"picked Up", value: "pickedUp", progressValue:50 },
    {label:"on The Tour", value: "onTheTour", progressValue:75 },
    {label:"delivered", value: "delivered", progressValue:100 }
];
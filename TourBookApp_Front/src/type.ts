export type User ={
    _id: string;
    email: string;
    name: string;
    addressLine1: string;
    city: string;
    country: string;

}

export type vehicleType={
    vehicleCategory: string;
    pricePerKm: number;
    color: string[];
    vehicleImageUrl: string;
    numOfSeats: number;
    manufacYear: number;
}

export type Transfer = {
    _id: string;
    transferName: string;
    city: string;
    estimatedArrivalTime:number;
    vehicleTypes: vehicleType[];
    transferImageUrl: string;
}

export type TransferSearchResponse = {
    data: Transfer[];
    pagination:{
        total : number;
        page : number;
        pages: number;
    }
}

export type BookingStatus = "placed" | "confirmed" | "pickedUp" | "onTheTour" |"delivered";

export type Booking ={
    _id: string;
    transfer: Transfer;
    user: User;
    bookingDetails:{
        date : string;
        time : string;
        distance:number;
        color: string;
    },
    userDetails:{
        email: string;
        name: string;
        addressLine1: string;
        city: string;
        country: string;
    };
    vehicleTypeIndex:string;
    status: BookingStatus;
    createdAt: string;
    transferId: string;
}


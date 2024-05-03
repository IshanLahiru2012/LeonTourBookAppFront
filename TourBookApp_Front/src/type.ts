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


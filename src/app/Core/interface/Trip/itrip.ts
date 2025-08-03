export interface ITrip {
    tripId: number;
    startTime: string;
    endTime: string;
    pickupAddress: string;
    dropOffAddress: string;
    driverName: string;
    nurseName: string;
    distanceKM: number;
    price: number;
    tripStatus: TripStatus;
}
export enum TripStatus {
    Pending = 0,
    Assigned = 1,
    Ongoing = 2,
    Completed = 3,
    Cancelled = 4,
    Failed = 5
}
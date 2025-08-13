export interface ProfitDistributionDTO {
  id: number;
  tripId: number;
  trip: any; // TripDTO if available
  totalTripPrice: number;
  driverProfit?: number;
  driverId?: string;
  driverName?: string;
  nurseProfit?: number;
  nurseId?: string;
  nurseName?: string;
  platformProfit?: number;
  distributionDate: string;
  driverPercentage: number;
  nursePercentage: number;
  platformPercentage: number;
}

export interface UserBalanceDTO {
  success: boolean
  message: string
  data: number
}

export interface ProfitSummaryDTO {
  totalPlatformRevenue: number;
  totalDriverPayments: number;
  totalNursePayments: number;
  totalPlatformProfit: number;
  totalTrips: number;
  fromDate: string;
  toDate: string;
}
export interface WithdrawalUserRequests {
  id: number
  userId: string
  userName: string
  userType: string
  amount: number
  requestDate: string
  status: WithdrawalStatus
  processedDate: any
  adminNotes: any
  processedByAdminId: any
  processedByAdminName: any
}
  export enum WithdrawalStatus
 {
     Pending = 0,    // في الانتظار
     Approved = 1,   // موافق عليه
     Rejected = 2,   // مرفوض
     Completed = 3   // مكتمل
 }
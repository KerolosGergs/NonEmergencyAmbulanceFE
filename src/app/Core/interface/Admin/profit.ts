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
  userId: string;
  userName: string;
  userType: string; // Driver, Nurse, Admin
  currentBalance: number;
  totalEarnings: number;
  totalWithdrawn: number;
  pendingWithdrawals: number;
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

export interface IProfitDistribution {
  id: number;
  tripId: number;
  driverId: string;
  nurseId: string;
  driverAmount: number;
  nurseAmount: number;
  companyAmount: number;
  distributionDate: Date;
  status: ProfitDistributionStatus;
}

export interface IUserBalance {
  userId: string;
  totalEarnings: number;
  pendingAmount: number;
  availableAmount: number;
  lastUpdated: Date;
}

export interface IProfitHistory {
  id: number;
  tripId: number;
  amount: number;
  distributionDate: Date;
  status: ProfitDistributionStatus;
  notes?: string;
}

export interface CreateWithdrawalRequestDTO {
  userId: string;
  amount: number;
  bankAccount?: string;
  bankName?: string;
  notes?: string;
}

export enum ProfitDistributionStatus {
  Pending = 'Pending',
  Distributed = 'Distributed',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}

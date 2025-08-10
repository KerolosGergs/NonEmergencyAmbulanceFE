export interface IWithdrawalRequest {
  id: number;
  driverId: number;
  amount: number;
  status: WithdrawalStatus;
  requestDate: string;
  processedDate?: string;
  notes?: string;
}

export interface WithdrawalSummaryDTO {
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  completedRequests: number;
  totalRequestedAmount: number;
  totalApprovedAmount: number;
  totalCompletedAmount: number;
}

export enum WithdrawalStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
  Completed = 3
}

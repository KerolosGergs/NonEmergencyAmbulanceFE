export interface IWithdrawalRequest {
  id: number;
  userId: string;
  userName: string;
  userType: string; // Driver, Nurse
  amount: number;
  status: WithdrawalStatus;
  requestDate: string;
  processedDate?: string;
  adminNotes?: string;
  processedByAdminId?: string;
  processedByAdminName?: string;
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

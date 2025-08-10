export interface IWithdrawalRequest {
  id: number;
  userId: string;
  amount: number;
  status: WithdrawalStatus;
  requestDate: Date;
  approvedDate?: Date;
  completedDate?: Date;
  notes?: string;
  adminId?: string;
  bankAccount?: string;
  bankName?: string;
}

export interface CreateWithdrawalRequestDTO {
  userId: string;
  amount: number;
  bankAccount?: string;
  bankName?: string;
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
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Completed = 'Completed'
}

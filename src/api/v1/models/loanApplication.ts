export type LoanStatus = "pending" | "under_review" | "approved" | "rejected" | "flagged";

export interface LoanApplication {
  id: string;
  applicant: string;
  amount: number;
  status: LoanStatus;
  createdAt: string;
  updatedAt: string;
  riskScore: number;
  notes?: string;
}

export interface CreateLoanApplicationInput {
  applicant: string;
  amount: number;
  status?: LoanStatus;
  riskScore: number;
  notes?: string;
}

export interface UpdateLoanApplicationInput {
  applicant?: string;
  amount?: number;
  status?: LoanStatus;
  riskScore?: number;
  notes?: string;
}

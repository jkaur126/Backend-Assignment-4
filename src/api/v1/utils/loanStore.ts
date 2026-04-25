import type {
  CreateLoanApplicationInput,
  LoanApplication,
  UpdateLoanApplicationInput,
} from "../models/loanApplication";
import { NotFoundError } from "../errors/AppError";
import { ERROR_CODES } from "../../../constants/errorCodes";

const seedLoans: LoanApplication[] = [
  {
    id: "1",
    applicant: "John Smith",
    amount: 50000,
    status: "pending",
    createdAt: "2025-01-10T10:00:00.000Z",
    updatedAt: "2025-01-10T10:00:00.000Z",
    riskScore: 68,
  },
  {
    id: "2",
    applicant: "Sarah Johnson",
    amount: 150000,
    status: "under_review",
    createdAt: "2025-01-08T10:00:00.000Z",
    updatedAt: "2025-01-08T10:00:00.000Z",
    riskScore: 79,
  },
  {
    id: "3",
    applicant: "Michael Chen",
    amount: 500000,
    status: "pending",
    createdAt: "2025-01-05T10:00:00.000Z",
    updatedAt: "2025-01-05T10:00:00.000Z",
    riskScore: 91,
  },
  {
    id: "4",
    applicant: "Emily Williams",
    amount: 1000000,
    status: "flagged",
    createdAt: "2025-01-03T10:00:00.000Z",
    updatedAt: "2025-01-03T10:00:00.000Z",
    riskScore: 98,
  },
];

const cloneLoans = (): LoanApplication[] => seedLoans.map((loan) => ({ ...loan }));

let loans = cloneLoans();

const findLoanIndex = (id: string): number => loans.findIndex((loan) => loan.id === id);

export const resetLoanStore = (): void => {
  loans = cloneLoans();
};

export const listLoans = (): LoanApplication[] => loans.map((loan) => ({ ...loan }));

export const getLoanById = (id: string): LoanApplication => {
  const loan = loans.find((item) => item.id === id);

  if (!loan) {
    throw new NotFoundError(`Loan application ${id} was not found.`, ERROR_CODES.RESOURCE_NOT_FOUND);
  }

  return { ...loan };
};

export const createLoan = (input: CreateLoanApplicationInput): LoanApplication => {
  const timestamp = new Date().toISOString();
  const nextId = `${Math.max(...loans.map((loan) => Number(loan.id))) + 1}`;
  const loan: LoanApplication = {
    id: nextId,
    applicant: input.applicant,
    amount: input.amount,
    status: input.status ?? "pending",
    createdAt: timestamp,
    updatedAt: timestamp,
    riskScore: input.riskScore,
    ...(input.notes ? { notes: input.notes } : {}),
  };

  loans.push(loan);
  return { ...loan };
};

export const updateLoan = (id: string, input: UpdateLoanApplicationInput): LoanApplication => {
  const index = findLoanIndex(id);

  if (index === -1) {
    throw new NotFoundError(`Loan application ${id} was not found.`, ERROR_CODES.RESOURCE_NOT_FOUND);
  }

  const updatedLoan: LoanApplication = {
    ...loans[index],
    ...input,
    updatedAt: new Date().toISOString(),
  };

  loans[index] = updatedLoan;
  return { ...updatedLoan };
};

export const deleteLoan = (id: string): LoanApplication => {
  const index = findLoanIndex(id);

  if (index === -1) {
    throw new NotFoundError(`Loan application ${id} was not found.`, ERROR_CODES.RESOURCE_NOT_FOUND);
  }

  const [deletedLoan] = loans.splice(index, 1);
  return { ...deletedLoan };
};


"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLoan = exports.updateLoan = exports.createLoan = exports.getLoanById = exports.listLoans = exports.resetLoanStore = void 0;
const AppError_1 = require("../errors/AppError");
const errorCodes_1 = require("../../../constants/errorCodes");
const seedLoans = [
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
const cloneLoans = () => seedLoans.map((loan) => ({ ...loan }));
let loans = cloneLoans();
const findLoanIndex = (id) => loans.findIndex((loan) => loan.id === id);
const resetLoanStore = () => {
    loans = cloneLoans();
};
exports.resetLoanStore = resetLoanStore;
const listLoans = () => loans.map((loan) => ({ ...loan }));
exports.listLoans = listLoans;
const getLoanById = (id) => {
    const loan = loans.find((item) => item.id === id);
    if (!loan) {
        throw new AppError_1.NotFoundError(`Loan application ${id} was not found.`, errorCodes_1.ERROR_CODES.RESOURCE_NOT_FOUND);
    }
    return { ...loan };
};
exports.getLoanById = getLoanById;
const createLoan = (input) => {
    const timestamp = new Date().toISOString();
    const nextId = `${Math.max(...loans.map((loan) => Number(loan.id))) + 1}`;
    const loan = {
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
exports.createLoan = createLoan;
const updateLoan = (id, input) => {
    const index = findLoanIndex(id);
    if (index === -1) {
        throw new AppError_1.NotFoundError(`Loan application ${id} was not found.`, errorCodes_1.ERROR_CODES.RESOURCE_NOT_FOUND);
    }
    const updatedLoan = {
        ...loans[index],
        ...input,
        updatedAt: new Date().toISOString(),
    };
    loans[index] = updatedLoan;
    return { ...updatedLoan };
};
exports.updateLoan = updateLoan;
const deleteLoan = (id) => {
    const index = findLoanIndex(id);
    if (index === -1) {
        throw new AppError_1.NotFoundError(`Loan application ${id} was not found.`, errorCodes_1.ERROR_CODES.RESOURCE_NOT_FOUND);
    }
    const [deletedLoan] = loans.splice(index, 1);
    return { ...deletedLoan };
};
exports.deleteLoan = deleteLoan;

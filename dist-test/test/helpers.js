"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetTestState = exports.installTestTokenVerifier = void 0;
const tokenVerifier_1 = require("../src/api/v1/utils/tokenVerifier");
const loanStore_1 = require("../src/api/v1/utils/loanStore");
const installTestTokenVerifier = () => {
    const verifier = {
        async verifyIdToken(token) {
            switch (token) {
                case "analyst-token":
                    return { uid: "user-1", email: "analyst@pixell-river.com", role: "analyst" };
                case "manager-token":
                    return { uid: "user-2", email: "manager@pixell-river.com", role: "manager" };
                case "admin-token":
                    return { uid: "user-3", email: "admin@pixell-river.com", role: "admin" };
                case "no-role-token":
                    return { uid: "user-4", email: "norole@pixell-river.com" };
                default:
                    throw new Error("Token verification failed");
            }
        },
    };
    (0, tokenVerifier_1.setTokenVerifier)(verifier);
};
exports.installTestTokenVerifier = installTestTokenVerifier;
const resetTestState = () => {
    (0, loanStore_1.resetLoanStore)();
};
exports.resetTestState = resetTestState;

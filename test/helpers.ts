import type { TokenVerifier } from "../src/api/v1/utils/tokenVerifier";
import { setTokenVerifier } from "../src/api/v1/utils/tokenVerifier";
import { resetLoanStore } from "../src/api/v1/utils/loanStore";

export const installTestTokenVerifier = (): void => {
  const verifier: TokenVerifier = {
    async verifyIdToken(token: string) {
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

  setTokenVerifier(verifier);
};

export const resetTestState = (): void => {
  resetLoanStore();
};

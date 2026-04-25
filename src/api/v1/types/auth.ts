export type UserRole = "analyst" | "manager" | "admin";

export interface AuthenticatedUser {
  uid: string;
  email?: string;
  role?: UserRole;
  claims: Record<string, unknown>;
}

export interface VerifiedTokenPayload {
  uid: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
}

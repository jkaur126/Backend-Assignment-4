import type { AuthenticatedUser } from "./auth";

declare global {
  namespace Express {
    interface Locals {
      user?: AuthenticatedUser;
    }
  }
}

export {};

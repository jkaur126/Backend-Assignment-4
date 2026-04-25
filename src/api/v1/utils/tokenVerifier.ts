import { getFirebaseAuth } from "../../../config/firebase";
import type { VerifiedTokenPayload } from "../types/auth";

export interface TokenVerifier {
  verifyIdToken(token: string): Promise<VerifiedTokenPayload>;
}

class FirebaseTokenVerifier implements TokenVerifier {
  public async verifyIdToken(token: string): Promise<VerifiedTokenPayload> {
    const decodedToken = await getFirebaseAuth().verifyIdToken(token);
    return {
      ...decodedToken,
      uid: decodedToken.uid,
      email: decodedToken.email,
      role: typeof decodedToken.role === "string" ? decodedToken.role : undefined,
    };
  }
}

let tokenVerifier: TokenVerifier = new FirebaseTokenVerifier();

export const getTokenVerifier = (): TokenVerifier => tokenVerifier;

export const setTokenVerifier = (verifier: TokenVerifier): void => {
  tokenVerifier = verifier;
};

import { getApps, initializeApp, cert, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { AuthenticationError } from "../api/v1/errors/AppError";
import { ERROR_CODES } from "../constants/errorCodes";
import { env } from "./env";

let firebaseApp: App | null = null;

const hasFirebaseCredentials = (): boolean =>
  Boolean(env.firebaseProjectId && env.firebaseClientEmail && env.firebasePrivateKey);

export const initializeFirebaseApp = (): App => {
  if (!hasFirebaseCredentials()) {
    throw new AuthenticationError(
      "Firebase Admin SDK is not configured. Add FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.",
      ERROR_CODES.FIREBASE_NOT_CONFIGURED,
    );
  }

  if (!firebaseApp) {
    firebaseApp =
      getApps()[0] ??
      initializeApp({
        credential: cert({
          projectId: env.firebaseProjectId,
          clientEmail: env.firebaseClientEmail,
          privateKey: env.firebasePrivateKey,
        }),
      });
  }

  return firebaseApp;
};

export const getFirebaseAuth = (): Auth => {
  const app = initializeFirebaseApp();
  return getAuth(app);
};

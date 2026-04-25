"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirebaseAuth = exports.initializeFirebaseApp = void 0;
const app_1 = require("firebase-admin/app");
const auth_1 = require("firebase-admin/auth");
const AppError_1 = require("../api/v1/errors/AppError");
const errorCodes_1 = require("../constants/errorCodes");
const env_1 = require("./env");
let firebaseApp = null;
const hasFirebaseCredentials = () => Boolean(env_1.env.firebaseProjectId && env_1.env.firebaseClientEmail && env_1.env.firebasePrivateKey);
const initializeFirebaseApp = () => {
    if (!hasFirebaseCredentials()) {
        throw new AppError_1.AuthenticationError("Firebase Admin SDK is not configured. Add FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.", errorCodes_1.ERROR_CODES.FIREBASE_NOT_CONFIGURED);
    }
    if (!firebaseApp) {
        firebaseApp =
            (0, app_1.getApps)()[0] ??
                (0, app_1.initializeApp)({
                    credential: (0, app_1.cert)({
                        projectId: env_1.env.firebaseProjectId,
                        clientEmail: env_1.env.firebaseClientEmail,
                        privateKey: env_1.env.firebasePrivateKey,
                    }),
                });
    }
    return firebaseApp;
};
exports.initializeFirebaseApp = initializeFirebaseApp;
const getFirebaseAuth = () => {
    const app = (0, exports.initializeFirebaseApp)();
    return (0, auth_1.getAuth)(app);
};
exports.getFirebaseAuth = getFirebaseAuth;

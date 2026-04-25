"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTokenVerifier = exports.getTokenVerifier = void 0;
const firebase_1 = require("../../../config/firebase");
class FirebaseTokenVerifier {
    async verifyIdToken(token) {
        const decodedToken = await (0, firebase_1.getFirebaseAuth)().verifyIdToken(token);
        return {
            ...decodedToken,
            uid: decodedToken.uid,
            email: decodedToken.email,
            role: typeof decodedToken.role === "string" ? decodedToken.role : undefined,
        };
    }
}
let tokenVerifier = new FirebaseTokenVerifier();
const getTokenVerifier = () => tokenVerifier;
exports.getTokenVerifier = getTokenVerifier;
const setTokenVerifier = (verifier) => {
    tokenVerifier = verifier;
};
exports.setTokenVerifier = setTokenVerifier;

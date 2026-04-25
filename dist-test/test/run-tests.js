"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const helpers_1 = require("./helpers");
(0, helpers_1.installTestTokenVerifier)();
const tests = [
    {
        name: "GET /api/v1/health returns 200 without authentication",
        async run() {
            (0, helpers_1.resetTestState)();
            const response = await (0, supertest_1.default)(app_1.default).get("/api/v1/health");
            strict_1.default.equal(response.status, 200);
            strict_1.default.equal(response.body.success, true);
            strict_1.default.equal(response.body.data.status, "ok");
        },
    },
    {
        name: "GET /api/v1/loans returns 401 when token is missing",
        async run() {
            (0, helpers_1.resetTestState)();
            const response = await (0, supertest_1.default)(app_1.default).get("/api/v1/loans");
            strict_1.default.equal(response.status, 401);
            strict_1.default.equal(response.body.error.code, "TOKEN_NOT_FOUND");
        },
    },
    {
        name: "GET /api/v1/loans returns 401 when token is invalid",
        async run() {
            (0, helpers_1.resetTestState)();
            const response = await (0, supertest_1.default)(app_1.default).get("/api/v1/loans").set("Authorization", "Bearer invalid-token");
            strict_1.default.equal(response.status, 401);
            strict_1.default.equal(response.body.error.code, "TOKEN_INVALID");
        },
    },
    {
        name: "POST /api/v1/loans returns 403 for analyst role",
        async run() {
            (0, helpers_1.resetTestState)();
            const response = await (0, supertest_1.default)(app_1.default)
                .post("/api/v1/loans")
                .set("Authorization", "Bearer analyst-token")
                .send({
                applicant: "Fraud Check User",
                amount: 90000,
                riskScore: 72,
            });
            strict_1.default.equal(response.status, 403);
            strict_1.default.equal(response.body.error.code, "INSUFFICIENT_ROLE");
        },
    },
    {
        name: "POST /api/v1/loans returns 201 for manager role",
        async run() {
            (0, helpers_1.resetTestState)();
            const response = await (0, supertest_1.default)(app_1.default)
                .post("/api/v1/loans")
                .set("Authorization", "Bearer manager-token")
                .send({
                applicant: "Fraud Check User",
                amount: 90000,
                riskScore: 72,
                notes: "Escalated for manual review.",
            });
            strict_1.default.equal(response.status, 201);
            strict_1.default.equal(response.body.success, true);
            strict_1.default.equal(response.body.data.applicant, "Fraud Check User");
        },
    },
    {
        name: "DELETE /api/v1/loans/:id returns 403 for manager role",
        async run() {
            (0, helpers_1.resetTestState)();
            const response = await (0, supertest_1.default)(app_1.default)
                .delete("/api/v1/loans/1")
                .set("Authorization", "Bearer manager-token");
            strict_1.default.equal(response.status, 403);
            strict_1.default.equal(response.body.error.code, "INSUFFICIENT_ROLE");
        },
    },
    {
        name: "DELETE /api/v1/loans/:id returns 200 for admin role",
        async run() {
            (0, helpers_1.resetTestState)();
            const response = await (0, supertest_1.default)(app_1.default)
                .delete("/api/v1/loans/1")
                .set("Authorization", "Bearer admin-token");
            strict_1.default.equal(response.status, 200);
            strict_1.default.equal(response.body.data.id, "1");
        },
    },
    {
        name: "GET /api/v1/loans returns 403 when authenticated user has no role",
        async run() {
            (0, helpers_1.resetTestState)();
            const response = await (0, supertest_1.default)(app_1.default)
                .get("/api/v1/loans")
                .set("Authorization", "Bearer no-role-token");
            strict_1.default.equal(response.status, 403);
            strict_1.default.equal(response.body.error.code, "ROLE_NOT_FOUND");
        },
    },
];
const run = async () => {
    let passed = 0;
    for (const testCase of tests) {
        await testCase.run();
        passed += 1;
        console.log(`PASS ${testCase.name}`);
    }
    console.log(`\n${passed}/${tests.length} tests passed`);
};
void run().catch((error) => {
    console.error("Test run failed");
    console.error(error);
    process.exitCode = 1;
});

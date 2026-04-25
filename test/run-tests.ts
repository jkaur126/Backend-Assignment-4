import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app";
import { installTestTokenVerifier, resetTestState } from "./helpers";

installTestTokenVerifier();

interface TestCase {
  name: string;
  run: () => Promise<void>;
}

const tests: TestCase[] = [
  {
    name: "GET /api/v1/health returns 200 without authentication",
    async run() {
      resetTestState();
      const response = await request(app).get("/api/v1/health");
      assert.equal(response.status, 200);
      assert.equal(response.body.success, true);
      assert.equal(response.body.data.status, "ok");
    },
  },
  {
    name: "GET /api/v1/loans returns 401 when token is missing",
    async run() {
      resetTestState();
      const response = await request(app).get("/api/v1/loans");
      assert.equal(response.status, 401);
      assert.equal(response.body.error.code, "TOKEN_NOT_FOUND");
    },
  },
  {
    name: "GET /api/v1/loans returns 401 when token is invalid",
    async run() {
      resetTestState();
      const response = await request(app).get("/api/v1/loans").set("Authorization", "Bearer invalid-token");
      assert.equal(response.status, 401);
      assert.equal(response.body.error.code, "TOKEN_INVALID");
    },
  },
  {
    name: "POST /api/v1/loans returns 403 for analyst role",
    async run() {
      resetTestState();
      const response = await request(app)
        .post("/api/v1/loans")
        .set("Authorization", "Bearer analyst-token")
        .send({
          applicant: "Fraud Check User",
          amount: 90000,
          riskScore: 72,
        });

      assert.equal(response.status, 403);
      assert.equal(response.body.error.code, "INSUFFICIENT_ROLE");
    },
  },
  {
    name: "POST /api/v1/loans returns 201 for manager role",
    async run() {
      resetTestState();
      const response = await request(app)
        .post("/api/v1/loans")
        .set("Authorization", "Bearer manager-token")
        .send({
          applicant: "Fraud Check User",
          amount: 90000,
          riskScore: 72,
          notes: "Escalated for manual review.",
        });

      assert.equal(response.status, 201);
      assert.equal(response.body.success, true);
      assert.equal(response.body.data.applicant, "Fraud Check User");
    },
  },
  {
    name: "DELETE /api/v1/loans/:id returns 403 for manager role",
    async run() {
      resetTestState();
      const response = await request(app)
        .delete("/api/v1/loans/1")
        .set("Authorization", "Bearer manager-token");

      assert.equal(response.status, 403);
      assert.equal(response.body.error.code, "INSUFFICIENT_ROLE");
    },
  },
  {
    name: "DELETE /api/v1/loans/:id returns 200 for admin role",
    async run() {
      resetTestState();
      const response = await request(app)
        .delete("/api/v1/loans/1")
        .set("Authorization", "Bearer admin-token");

      assert.equal(response.status, 200);
      assert.equal(response.body.data.id, "1");
    },
  },
  {
    name: "GET /api/v1/loans returns 403 when authenticated user has no role",
    async run() {
      resetTestState();
      const response = await request(app)
        .get("/api/v1/loans")
        .set("Authorization", "Bearer no-role-token");

      assert.equal(response.status, 403);
      assert.equal(response.body.error.code, "ROLE_NOT_FOUND");
    },
  },
];

const run = async (): Promise<void> => {
  let passed = 0;

  for (const testCase of tests) {
    await testCase.run();
    passed += 1;
    console.log(`PASS ${testCase.name}`);
  }

  console.log(`\n${passed}/${tests.length} tests passed`);
};

void run().catch((error: unknown) => {
  console.error("Test run failed");
  console.error(error);
  process.exitCode = 1;
});

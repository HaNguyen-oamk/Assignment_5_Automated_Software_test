import { describe, expect, test } from "vitest";
import request from "supertest";
import express from "express";
import dogRoutes from "../routes/dogRoutes";

const app = express();
app.use(express.json());
app.use("/api/dogs", dogRoutes);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

describe("Dog API tests", () => {
  // Test 1: Positive API test
  test("GET /api/dogs/random returns random dog image", async () => {
    const response = await request(app).get("/api/dogs/random");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.imageUrl).toBeDefined();
    expect(typeof response.body.data.imageUrl).toBe("string");
  });

  // Test 2: Negative API test
  test("GET invalid route returns 404 error", async () => {
    const response = await request(app).get("/api/dogs/invalid");

    expect(response.status).toBe(404);
    expect(response.body.error).toBeDefined();
  });
});

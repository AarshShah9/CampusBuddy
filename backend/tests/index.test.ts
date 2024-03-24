// Write a jest test to hit the /Test Endpoint
import request from "supertest";
jest.mock("../utils/cronTasks"); // Mock to disable cron tasks
import app, { server } from "../index";

test("Intial Test", async () => {
  const res = await request(app).get("/Test");
  expect(res.statusCode).toEqual(200);
  expect(res.body).toEqual({ message: "Hello World!" });
});

afterAll((done) => {
  server.close(done);
});

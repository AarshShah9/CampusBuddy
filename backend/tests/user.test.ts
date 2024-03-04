import request from "supertest";
import app, { server } from "../index";

test("User Test", async () => {
  // First request to get the token
  const res = await request(app).get("/api/user/token");
  expect(res.statusCode).toEqual(200);

  const token = res.body.authToken;

  const res2 = await request(app)
    .get("/api/user/verify")
    .set("Authorization", `Bearer ${token}`);

  expect(res2.statusCode).toEqual(200);
});

afterAll((done) => {
  server.close(done);
});

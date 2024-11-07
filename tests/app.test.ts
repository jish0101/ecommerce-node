import app from "../src/app";
import request from "supertest";

let server: any;

beforeAll(() => {
  server = app.listen(4000);
});

afterAll((done) => {
  server.close(done);
});

describe("Test the root path", () => {
  it("should respond with a JSON message", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode);
    expect(response.body.message).toBe(
      "Welcome to this api, this is a clone of x",
    );
  });
});

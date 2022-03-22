const { describe, it } = require("mocha");
const request = require("supertest");
const assert = require("assert");
const app = require("./api.js");

describe("API Suite test", () => {
  describe("/contact", () => {
    it("should request the contact page and return HTTP Status 200", async () => {
      const response = await request(app).get("/contact").expect(200);
      assert.deepStrictEqual(response.text, "contact us page");
    });
  });

  describe("/hi", () => {
    it("should request the inexistent page /hi and redirect to /hello", async () => {
      const response = await request(app).get("/hi").expect(200);
      assert.deepStrictEqual(response.text, "Hello world");
    });
  });

  describe("/login", () => {
    it("should login successfully on the login route and return HTTP status 200", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "CherryRamatis", password: "123" })
        .expect(200);

      assert.deepStrictEqual(response.text, "Login has succeeded");
    });

    it("should unauthorize a request when requesting it using wrong credentails and return HTTP Status 401", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "WrongUsername", password: "123" })
        .expect(401);

      assert.ok(response.unauthorized);
      assert.deepStrictEqual(response.text, "Login failed");
    });
  });
});

const request = require("supertest");
const server = require("./server");

describe("server.js", () => {
  describe("Get to / endpoint", () => {
    it("should respond status code 200 OK", async () => {
      let response = await request(server).get("/");

      expect(response.status).toBe(200);
    });
    it("should respond with JSON", async () => {
      let response = await request(server).get("/");

      expect(response.type).toMatch(/json/i);
    });
    it("should send back an object with an api", async () => {
      const expected = { api: "up" };

      let response = await request(server).get("/");

      expect(response.body).toEqual(expected);
    });
  });
  describe("POST /greet endpoint", () => {
    it("should respond with status code 200 OK", async () => {
      const body = { firstName: "Stephan", lastName: "Bondor" };

      let response = await request(server)
        .post("/greet")
        .send(body);

      expect(response.body).toEqual({ hello: "Stephan Bondor" });
      response = await request(server)
        .post("/greet")
        .send({ firstName: "Kai", lastName: "Lovingfoss" });
      expect(response.body).toEqual({ hello: "Kai Lovingfoss" });
    });
    it("should return 400 if firstName or lastName is missing", async () => {
      let response = await request(server)
        .post("/greet")
        .send({ firstName: "frodo" });
      expect(response.status).toBe(400);

      response = await request(server)
        .post("/greet")
        .send({ lastName: "baggins" });
      expect(response.status).toBe(400);
    });
  });
});

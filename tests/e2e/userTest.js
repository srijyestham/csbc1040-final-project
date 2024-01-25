const supertest = require("supertest");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe, it, before, after } = require("mocha");
const { app } = require("../../index.js");

const expect = chai.expect;
chai.use(chaiHttp);

let authToken;
const port = 3111;
const server = app.listen(port, () =>
  console.log(`Application running in port ${port}`),
);

before((done) => {
  supertest(app)
    .post("/api/users/login")
    .send({
      email: "a@mail.com",
      password: "123",
    })
    .end((err, res) => {
      authToken = res.body.token;
      done();
    });
});

describe("e2e API Tests", () => {
  // Test Case 1: should be able to retrieve my user entity
  it("should be able to retrieve my user entity", (done) => {
    supertest(app)
      .get("/api/users/1")
      .set("Cookie", `auth-token=${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        // Add more assertions based on your response structure
        expect(res.body).to.have.property("name");
        expect(res.body.name).to.equal("a");
        done();
      });
  });

  // Test Case 2: should not be able to retrieve a different user entity and return appropriate error code
  it("should not be able to retrieve a different user entity and return appropriate error code", (done) => {
    supertest(app)
      .get("/api/users/2")
      .set("Cookie", `auth-token=${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.text).to.equal("Unauthorized User with user id 1");
        done();
      });
  });

  // Test Case 3: should not be able to retrieve an entity if not authenticated and return appropriate error code
  it("should not be able to retrieve an entity if not authenticated and return appropriate error code", (done) => {
    supertest(app)
      .get("/api/users")
      .end((err, res) => {
        expect(res).to.have.status(501);
        expect(res.text).to.equal(
          "Access Denied - Token Unavailable/Empty in Header",
        );
        done();
      });
  });
});

after(() => {
  server.close();
});

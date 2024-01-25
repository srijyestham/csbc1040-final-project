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

describe("Unit API Tests", () => {
  // Test Case: should be able to retrieve my user entity
  it("should be able to retrieve my user entity", (done) => {
    supertest(app)
      .get("/api/users/1")
      .set("Cookie", `auth-token=${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  // Test Case: should not be able to retrieve a different user entity and return appropriate error code
  it("should not be able to retrieve a different user entity and return appropriate error code", (done) => {
    supertest(app)
      .get("/api/users/2")
      .set("Cookie", `auth-token=${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  // Test Case: should not be able to retrieve an entity if not authenticated and return appropriate error code
  it("should not be able to retrieve an entity if not authenticated and return appropriate error code", (done) => {
    supertest(app)
      .get("/api/users")
      .end((err, res) => {
        expect(res).to.have.status(501);
        done();
      });
  });
});

after(() => {
  server.close();
});

import { PlatformApplication, PlatformTest } from "@tsed/common";
import { expect } from "chai";
import SuperTest from "supertest";
import { Server } from "../src/Server";

describe("Rest", () => {
  // bootstrap your Server to load all endpoints before run your test
  let request: SuperTest.SuperTest<SuperTest.Test>;

  before(PlatformTest.bootstrap(Server));
  before(() => {
    request = SuperTest(PlatformTest.callback());
  });

  after(PlatformTest.reset);

  describe("Wrong password", () => {
    it("should return 401", async () => {
      const response = await request.get("/").set('Authorization', "Basic YTpmYWtl");

      expect(response.statusCode).equals(401);
    });
  });
  describe("Without password", () => {
    it("should return 401", async () => {
      const response = await request.get("/");

      expect(response.statusCode).equals(401);
    });
  });
  describe("With valid password", () => {
    it("should return 200", async () => {
      const response = await request.get("/").set('Authorization', "Basic YTpzZWN1cmU=");

      expect(response.statusCode).equals(200);
    });
  });
});

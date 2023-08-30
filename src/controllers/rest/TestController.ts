import { Controller, } from "@tsed/di";
import { Get, Returns } from "@tsed/schema";
import { Authorize } from "@tsed/passport";

@Controller("/")
export class TestController {

  @Get("/")
  @Returns(200, String)
  @Authorize("basic")
  async get() {
    return "ok";
  }

}

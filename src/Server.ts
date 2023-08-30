import { Configuration, Inject } from "@tsed/di";
import { PlatformApplication } from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/ajv";
import { config } from "./config";
import * as rest from "./controllers/rest/index";
import "@tsed/passport";
import "./protocols/BasicAuth"
import "./filters/ErrorFilter"

@Configuration({
  ...config,
  passport: {
    disableSession: true
  },
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8080,
  httpsPort: false,
  mount: {
    "/": [
      ...Object.values(rest)
    ],
  },
  middlewares: [
    "cors",
    "cookie-parser",
    "compression",
    "method-override",
    "json-parser",
    {
      use: "urlencoded-parser",
      options: { extended: true }
    },
  ],
  exclude: [
    "**/*.spec.ts"
  ]
})
export class Server {
  @Inject() protected app: PlatformApplication;

  @Configuration() protected settings: Configuration;

}

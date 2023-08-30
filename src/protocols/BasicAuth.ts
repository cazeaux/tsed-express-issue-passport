import {Req} from "@tsed/common";
import {OnInstall, OnVerify, Protocol, Arg} from "@tsed/passport";
import {Strategy} from "passport";
import {BasicStrategy} from "passport-http";

@Protocol({
  name: "basic",
  useStrategy: BasicStrategy,
  settings: {}
})
export class BasicProtocol implements OnVerify, OnInstall {

  async $onVerify(@Req() request: Req, @Arg(0) username: string, @Arg(1) password: string) {
    return password === "secure";
  }

  $onInstall(strategy: Strategy): void {
    // intercept the strategy instance to adding extra configuration
  }
}

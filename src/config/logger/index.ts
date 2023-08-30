import { PlatformLoggerSettings } from "@tsed/common";

export default <PlatformLoggerSettings>{
  disableRoutesSummary: true,
  ignoreUrlPatterns: ["/status*", "/metrics*"]
};

export enum WebApiLogLevel {
  info,
  debug,
  warn,
  error
}

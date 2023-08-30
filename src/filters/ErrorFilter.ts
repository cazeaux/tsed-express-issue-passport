import { PlatformContext, ResponseErrorObject } from "@tsed/common";
import { Catch, ExceptionFilterMethods } from "@tsed/platform-exceptions";
import { Exception } from "@tsed/exceptions";

// Catch exception to ensure that we always calculate metrics when the error is thrown by TS.ED.
// This is based on : https://tsed.io/docs/exceptions.html#exception-filter
@Catch(Exception)
export class HttpExceptionFilter implements ExceptionFilterMethods {

  // The catch does not change the TS.ED default behavior. It is intended to calculate metrics only.
  catch(exception: Exception, ctx: PlatformContext) {
    const error = this.mapError(exception);
    const headers = this.getHeaders(exception);

    console.log(ctx.request.route.toString());

    ctx.response.setHeaders(headers).status(error.status).body(error);
  }

  // Default mapError
  mapError(error: any) {
    return {
      name: error.origin?.name || error.name,
      message: error.message,
      status: error.status || 500,
      errors: this.getErrors(error)
    };
  }

  // Default getErrors
  protected getErrors(error: any) {
    return [error, error.origin].filter(Boolean).reduce((errs, { errors }: ResponseErrorObject) => {
      return [...errs, ...(errors || [])];
    }, []);
  }

  // Default getHeaders
  protected getHeaders(error: any) {
    return [error, error.origin].filter(Boolean).reduce((obj, { headers }: ResponseErrorObject) => {
      return {
        ...obj,
        ...(headers || {})
      };
    }, {});
  }
}

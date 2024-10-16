import { PLATFORM_ID, inject } from "@angular/core";
import { HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { SsrCookieService } from "ngx-cookie-service-ssr";
import { isPlatformServer } from "@angular/common";

//const REQUEST = new InjectionToken("REQUEST");
//@Inject(REQUEST) private req: Request

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const ssrCookieService = inject(SsrCookieService);
  const sessionCookie = ssrCookieService.get('access_token', )

  let cloned: HttpRequest<unknown>;

  if (isPlatformServer(inject(PLATFORM_ID)) && request && request.headers.has("cookie")) {
    cloned = request.clone({
      withCredentials: true,
      headers: request.headers.set("cookies", request.headers.get("cookie") as string | string[]) })
  } else {
    cloned = request.clone({
      withCredentials: true,
      headers: request.headers
    });
  }

  return next(cloned);
}

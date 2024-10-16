import { PLATFORM_ID, inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';

//const REQUEST = new InjectionToken("REQUEST");
//@Inject(REQUEST) private req: Request

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  let cloned: HttpRequest<unknown>;

  if (isPlatformServer(inject(PLATFORM_ID)) && request && request.headers.has('cookie')) {
    cloned = request.clone({
      withCredentials: true,
      headers: request.headers.set('cookies', request.headers.get('cookie') as string | string[]),
    });
  } else {
    cloned = request.clone({
      withCredentials: true,
      headers: request.headers,
    });
  }

  return next(cloned);
};

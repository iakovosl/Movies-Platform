import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AccountService } from 'src/app/_services/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = this.accountService.userValue;
    const token = this.accountService.token;
    const isLoggedIn = user && token;
    const isApiUrl = request.url.startsWith(environment.apiUrl);

    // return if user is not logged in 
    if (!isLoggedIn || !isApiUrl) {
      return next.handle(request);
    }

    // add token to request header if user is logged in
    const reqtoken = request.clone({
      headers: request.headers.set('token', `${token}`),
    });

    return next.handle(reqtoken);
  }
}
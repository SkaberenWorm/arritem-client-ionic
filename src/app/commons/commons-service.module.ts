import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { Util } from './util/util';
import { UtilFormatingService } from './util/util.formating.service';
import { UtilValidation } from './util/util.validation';
import { AuthenticationService } from './services/authentication.service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    Util,
    UtilFormatingService,
    UtilValidation,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    AuthGuard,
    LoginGuard
  ],
  exports: []
})
export class CommonsServiceModule {}

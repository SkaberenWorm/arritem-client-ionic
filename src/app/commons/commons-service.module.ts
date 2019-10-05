import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { Util } from './util/util';
import { UtilFormatingService } from './util/util.formating.service';
import { UtilValidation } from './util/util.validation';
@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [Util, UtilFormatingService, UtilValidation],
  exports: []
})
export class CommonsServiceModule {}

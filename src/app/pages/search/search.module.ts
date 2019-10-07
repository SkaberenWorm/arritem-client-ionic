import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchPage } from './search.page';
import { HttpClientModule } from '@angular/common/http';
import { DepartamentoService } from '../../services/departamento.service';
import { ReservationAddPageModule } from '../reservation/reservation-add/reservation-add.module';
import { ReservationAddPage } from '../reservation/reservation-add/reservation-add.page';
import { CommonsServiceModule } from 'src/app/commons/commons-service.module';
import { JwtInterceptor } from 'src/app/commons/interceptors/jwt.interceptor';
import { TokenInterceptor } from 'src/app/commons/interceptors/token.interceptor';

const routes: Routes = [
  {
    path: '',
    component: SearchPage
  }
];

@NgModule({
  entryComponents: [ReservationAddPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ReservationAddPageModule,
    CommonsServiceModule
  ],
  declarations: [SearchPage],
  providers: [DepartamentoService]
})
export class SearchPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReservationPage } from './reservation.page';
import { CommonsServiceModule } from '../../commons/commons-service.module';
import { ReservaService } from 'src/app/services/reserva.service';
import { ReservationAddPage } from './reservation-add/reservation-add.page';

const routes: Routes = [
  {
    path: '',
    component: ReservationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    CommonsServiceModule
  ],
  declarations: [ReservationPage],
  providers: [ReservaService]
})
export class ReservationPageModule {}

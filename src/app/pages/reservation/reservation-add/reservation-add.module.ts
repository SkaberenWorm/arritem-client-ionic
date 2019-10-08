import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReservationAddPage } from './reservation-add.page';
import { LoginGuard } from 'src/app/commons/guards/login.guard';
const routes: Routes = [
  {
    path: 'new',
    component: ReservationAddPage,
    canLoad: [LoginGuard]
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [ReservationAddPage]
})
export class ReservationAddPageModule {}

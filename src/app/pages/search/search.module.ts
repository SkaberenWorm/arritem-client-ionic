import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchPage } from './search.page';
import { HttpClientModule } from '@angular/common/http';
import { DepartamentoService } from '../../services/departamento.service';
import { CommonsServiceModule } from '../../commons/commons-service.module';

const routes: Routes = [
  {
    path: '',
    component: SearchPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    CommonsServiceModule
  ],
  declarations: [SearchPage],
  providers: [DepartamentoService]
})
export class SearchPageModule {}

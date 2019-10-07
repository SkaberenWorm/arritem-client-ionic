import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginService } from './services/login.service';
import { LoginGuard } from './commons/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [LoginGuard]
  }
  /* { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'search', loadChildren: './pages/search/search.module#SearchPageModule' },
  {
    path: 'reservation',
    loadChildren: './pages/reservation/reservation.module#ReservationPageModule'
  },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' } */
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [LoginService]
})
export class AppRoutingModule {}

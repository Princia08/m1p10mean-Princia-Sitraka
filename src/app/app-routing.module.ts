import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './security/login/login.service';
import { LogoutService } from './security/logout/logout.service';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [LogoutService]
  },
  {
    path: 'inscription',
    component: InscriptionComponent
  },
  {
    path: 'home',
    loadChildren: async () => (await import('./home/home.module')).HomeModule,
    canActivate: [LoginService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

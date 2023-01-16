import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ListVoitureComponent } from './pages/voiture/list-voiture/list-voiture.component';
import { DetailVoitureComponent } from './pages/voiture/detail-voiture/detail-voiture.component';


@NgModule({
  declarations: [
    HomeComponent,
    AccueilComponent,
    ListVoitureComponent,
    DetailVoitureComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }

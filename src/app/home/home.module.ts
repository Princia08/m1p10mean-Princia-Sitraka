import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ListVoitureComponent } from './pages/voiture/list-voiture/list-voiture.component';
import { DetailVoitureComponent } from './pages/voiture/detail-voiture/detail-voiture.component';
import { ValidationComponent } from './pages/voiture/validation/validation.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DepotComponent } from './pages/voiture/depot/depot.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatButtonModule} from "@angular/material/button";
import { ReparationComponent } from './pages/reparation/reparation.component';
import {PdfViewerModule} from "ng2-pdf-viewer";
import { PdfDialogComponent } from './pdf-dialog/pdf-dialog.component';
import { SousreparationEditDialogComponent } from './pages/voiture/sousreparation-edit-dialog/sousreparation-edit-dialog.component';
import { StatistiqueComponent } from './pages/statistique/statistique.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { DepenseComponent } from './pages/depense/depense.component';


@NgModule({
  declarations: [
    HomeComponent,
    AccueilComponent,
    ListVoitureComponent,
    DetailVoitureComponent,
    DepotComponent,
    ValidationComponent,
    ConfirmDialogComponent,
    ReparationComponent
    PdfDialogComponent,
    SousreparationEditDialogComponent,
    StatistiqueComponent,
    DepenseComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    PdfViewerModule,
    NgxChartsModule,
  ]
})
export class HomeModule { }

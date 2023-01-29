import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVoitureComponent } from "./pages/voiture/list-voiture/list-voiture.component";
import { DetailVoitureComponent } from "./pages/voiture/detail-voiture/detail-voiture.component";
import { HomeComponent } from "./home.component";
import { ValidationComponent } from "./pages/voiture/validation/validation.component";
import { DepotComponent } from './pages/voiture/depot/depot.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ReparationComponent } from './pages/reparation/reparation.component';
import {StatistiqueComponent} from "./pages/statistique/statistique.component";
import {DepenseComponent} from "./pages/depense/depense.component";
import { FactureComponent } from './pages/facture/facture.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {path: '', component: AccueilComponent},
      {path: 'vehicule', component: ListVoitureComponent},
      {path: 'depot', component: DepotComponent},
      {path: 'reparation', component: ReparationComponent},
      {path: 'vehicule/:id', component: DetailVoitureComponent},
      {path: 'validation', component: ValidationComponent},
      {path: 'stat', component: StatistiqueComponent},
      {path: 'depenses', component: DepenseComponent},
      {path: 'facture', component: FactureComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}

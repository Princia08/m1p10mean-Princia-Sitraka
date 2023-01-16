import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccueilComponent} from './pages/accueil/accueil.component';
import {ListVoitureComponent} from "./pages/voiture/list-voiture/list-voiture.component";
import {DetailVoitureComponent} from "./pages/voiture/detail-voiture/detail-voiture.component";
import {HomeComponent} from "./home.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'vehicules', component: ListVoitureComponent},
  {path: 'vehicule/:id', component: DetailVoitureComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}

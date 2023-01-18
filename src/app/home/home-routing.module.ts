import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListVoitureComponent} from "./pages/voiture/list-voiture/list-voiture.component";
import {DetailVoitureComponent} from "./pages/voiture/detail-voiture/detail-voiture.component";
import {HomeComponent} from "./home.component";
import {ValidationComponent} from "./pages/voiture/validation/validation.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {path: 'vehicules', component: ListVoitureComponent},
      {path: 'vehicule/:id', component: DetailVoitureComponent},
      {path: 'validation', component: ValidationComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}

import { Component, OnInit } from '@angular/core';
import {MODEL_PROPERTIES_MAP, Voiture} from "../../../../@core/models/voiture.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-voiture',
  templateUrl: './list-voiture.component.html',
  styleUrls: ['./list-voiture.component.scss']
})
export class ListVoitureComponent implements OnInit {
  titlesColumn = MODEL_PROPERTIES_MAP;
  voitures :Voiture[] = ELEMENT_DATA;
  voiture : Voiture | undefined;

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
    console.log(this.titlesColumn);
  }
  getDetail(voiture:Voiture){
    this.router.navigate(['/home/vehicule',voiture._id]);
  }

}

export const ELEMENT_DATA: Voiture[] = [
  {_id:'1',idclient: '1', marque: 'Citroen', model: "C4", matricule: '4565 TAB',dans_garage:'oui'},
  {_id:'2',idclient: '1', marque: 'Ford', model: "Ranger", matricule: '4444 WWT',dans_garage:'oui'},
  {_id:'3',idclient: '1', marque: 'Ford', model: "Raptor", matricule: '7899 TAH',dans_garage:'oui'},
];

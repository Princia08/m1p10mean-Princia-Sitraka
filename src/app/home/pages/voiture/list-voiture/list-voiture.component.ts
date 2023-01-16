import { Component, OnInit } from '@angular/core';
import {Voiture} from "../../../../@core/models/voiture.model";

@Component({
  selector: 'app-list-voiture',
  templateUrl: './list-voiture.component.html',
  styleUrls: ['./list-voiture.component.scss']
})
export class ListVoitureComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

export const ELEMENT_DATA: Voiture[] = [
  {_id:'1',idclient: '1', marque: 'Hydrogen1', model: "test", matricule: 'H',dans_garage:'yes'},
  {_id:'2',idclient: '1', marque: 'Hydrogen2', model: "test", matricule: 'H',dans_garage:'yes'},
  {_id:'3',idclient: '1', marque: 'Hydrogen3', model: "test", matricule: 'H',dans_garage:'yes'},
];

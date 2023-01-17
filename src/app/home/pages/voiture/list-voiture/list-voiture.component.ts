import { Component, OnInit } from '@angular/core';
import {Voiture} from "../../../../@core/models/voiture.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-voiture',
  templateUrl: './list-voiture.component.html',
  styleUrls: ['./list-voiture.component.scss']
})
export class ListVoitureComponent implements OnInit {
  voitures :Voiture[] = ELEMENT_DATA;
  voiture : Voiture | undefined;
  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  getDetail(voiture:Voiture){
    this.router.navigate(['/home/vehicule',voiture._id]);
  }
}

const ELEMENT_DATA: Voiture[] = [
  {_id:'1',idclient: '1', marque: 'Hydrogen1', model: "test", matricule: 'H',dans_garage:'yes'},
  {_id:'2',idclient: '1', marque: 'Hydrogen2', model: "test", matricule: 'H',dans_garage:'yes'},
  {_id:'3',idclient: '1', marque: 'Hydrogen3', model: "test", matricule: 'H',dans_garage:'yes'},
];

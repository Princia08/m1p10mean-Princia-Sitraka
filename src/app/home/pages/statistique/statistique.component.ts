import {Component, OnInit} from '@angular/core';
import {ReparationService} from "../../../@core/services/reparation.service";

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent implements OnInit {
  reparationMoyenne: any;
  view: [number, number] = [400, 200];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  cardColor: string = '#3d4662';

  ngOnInit() {
    this.getDataMean();
  }

  constructor(private serviceReparation: ReparationService) {
  }

  getDataMean() {
    this.serviceReparation.getMontantMoyenne().subscribe(response => {
      this.reparationMoyenne = [
        {
          name: "Temps de réparation Moyenne effectué ",
          value: response + ' heure(s)'
        }
      ];
    })
  }


  onSelect(event: any) {
    console.log(event);
  }

}


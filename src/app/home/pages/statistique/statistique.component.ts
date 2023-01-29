import {Component, OnInit} from '@angular/core';
import {ReparationService} from "../../../@core/services/reparation.service";
import {DepenseService} from "../../../@core/services/depense.service";
import {FactureService} from "../../../@core/services/facture.service";


@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent implements OnInit {
  reparationMoyenne: any;
  viewTableau: [number, number] = [900, 200];
  viewGraphe: [number, number] = [900, 500];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  cardColor: string = '#3d4662';

  multi!: any[];

  options !: any;

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Jour';
  yAxisLabel: string = 'Chiffre d\'affaire';
  timeline: boolean = true;

  dataCA !: any[];

  ngOnInit() {
    this.getDataMean();
    // this.getDataCA();
  }


  constructor(
    private serviceReparation: ReparationService,
    private serviceDepense: DepenseService,
    private serviceFacture: FactureService
  ) {

  }

  getDataMean() {
    this.serviceReparation.getTempsReparationMoyenne().subscribe(reparationMoyenne => {
      this.serviceDepense.getTotalMois().subscribe(totalDepenseMois => {
        this.reparationMoyenne = [
          {
            name: "Temps de réparation Moyenne effectué ",
            value: reparationMoyenne + ' heure(s)'
          },
          {
            name: "Total des dépenses par mois",
            value: totalDepenseMois[0].total + ' Ar'
          },
          {
            name: "Chiffre d'affaire ajd",
            value: '420.000 Ar'
          },
          {
            name: "Bénéfice par mois",
            value: '420.000 Ar'
          },
        ];
      })
    })
  }

  getDataCA() {
    this.serviceFacture.getCA().subscribe(response => {
      this.dataCA = response;
      console.log(response);
    })
  }


  onSelect(event: any) {
    console.log(event);
  }
}

export var multi = [
  {
    "name": "Germany",
    "series": [
      {
        "name": "1990",
        "value": 62000000
      },
      {
        "name": "2010",
        "value": 73000000
      },
      {
        "name": "2011",
        "value": 89400000
      }
    ]
  },

  {
    "name": "USA",
    "series": [
      {
        "name": "1990",
        "value": 250000000
      },
      {
        "name": "2010",
        "value": 309000000
      },
      {
        "name": "2011",
        "value": 311000000
      }
    ]
  },

  {
    "name": "France",
    "series": [
      {
        "name": "1990",
        "value": 58000000
      },
      {
        "name": "2010",
        "value": 50000020
      },
      {
        "name": "2011",
        "value": 58000000
      }
    ]
  },
  {
    "name": "UK",
    "series": [
      {
        "name": "1990",
        "value": 57000000
      },
      {
        "name": "2010",
        "value": 62000000
      }
    ]
  }
];

import {Component, OnInit} from '@angular/core';
import {ReparationService} from "../../../@core/services/reparation.service";
import {DepenseService} from "../../../@core/services/depense.service";

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
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;
  ngOnInit() {
    this.getDataMean();
    this.generateEchart();
  }
  generateEchart(){
    this.options = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    };

  }

  constructor(
    private serviceReparation: ReparationService,
    private serviceDepense: DepenseService,
  ) {
    Object.assign(this, { multi })
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
            value: totalDepenseMois[0].total +' Ar'
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

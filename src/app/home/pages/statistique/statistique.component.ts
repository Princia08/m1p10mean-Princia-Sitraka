import {Component, OnInit} from '@angular/core';
import {ReparationService} from "../../../@core/services/reparation.service";
import {DepenseService} from "../../../@core/services/depense.service";
import {FactureService} from "../../../@core/services/facture.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";


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

  chiffreAffaire: any;
  chiffreAffaireMois: any;
  chiffreAffaires !: any[];

  form = new FormGroup({
    date1: new FormControl('', Validators.required),
    date2: new FormControl('', Validators.required),
  });
  formMois = new FormGroup({
    mois: new FormControl('', Validators.required),
  })

  months = [
    {value: 1, viewValue: 'Janvier'},
    {value: 2, viewValue: 'Février'},
    {value: 3, viewValue: 'Mars'},
    {value: 4, viewValue: 'Avril'},
    {value: 5, viewValue: 'Mai'},
    {value: 6, viewValue: 'Juin'},
    {value: 7, viewValue: 'Juillet'},
    {value: 8, viewValue: 'Août'},
    {value: 9, viewValue: 'Septembre'},
    {value: 10, viewValue: 'Octobre'},
    {value: 11, viewValue: 'Novembre'},
    {value: 12, viewValue: 'Décembre'}
  ];

  ngOnInit() {
    this.getDataMean();
    this.getDataCA();
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
            name: "Temps de rép Moyenne ",
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

        ];
      })
    })
  }

  getDataCA() {
    this.chiffreAffaire = 0;
    this.chiffreAffaireMois = 0;
  }

  loadCAJour() {
    console.log(this.form.value);
    this.serviceFacture.getCA(this.form.value).subscribe(response => {
      console.log(response);
      if (response.length != 0) {
        this.chiffreAffaires = response;
      } else {
        this.chiffreAffaire = 0;
      }
      ;
    })
  }

  loadCAMois() {
    this.serviceFacture.getCAMois(this.formMois.get('mois')?.value).subscribe(response => {
      if (response.length != 0) {
        this.chiffreAffaireMois = response[0].total;
      } else {
        this.chiffreAffaireMois = 0;
      }
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

import {Component, OnInit} from '@angular/core';
import {ReparationService} from "../../../@core/services/reparation.service";
import {DepenseService} from "../../../@core/services/depense.service";
import {FactureService} from "../../../@core/services/facture.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {Color} from "@swimlane/ngx-charts";


@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent implements OnInit {
  dashBoard: any;
  viewTableau: [number, number] = [1200, 200];

   colorScheme = {
    domain: ['#5AA454', '#3bbeb7', '#C7B42C', '#AAAAAA']
  };
  cardColor: string = '#f1f1f1';

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
  caDashboard: any;
  depenseDashboard: any;

  constructor(
    private serviceReparation: ReparationService,
    private serviceDepense: DepenseService,
    private serviceFacture: FactureService,
    private spinner: NgxSpinnerService
  ) {

  }

  ngOnInit() {
    this.spinner.show();
    this.getDataDashboard();
    this.getDataCA();
  }

  getDataDashboard() {
    let currentMonth = new Date().getMonth();
    // let moisPlusOne = currentMonth + 1 + '';
    console.log("mois : " + currentMonth)
    this.serviceReparation.getTempsReparationMoyenne().subscribe(reparationMoyenne => {
      this.serviceDepense.getTotalMois(currentMonth + '').subscribe(totalDepenseMois => {
        this.serviceFacture.getCAMois(currentMonth + '').subscribe(chiffreCurrent => {
          this.serviceFacture.getBenefice(currentMonth + '').subscribe(benefice => {

            if (chiffreCurrent.length != 0) {
              this.caDashboard = chiffreCurrent[0].total
            } else {
              this.caDashboard = 0;
            }
            if (totalDepenseMois.length != 0) {
              this.depenseDashboard = totalDepenseMois[0].total
            } else {
              this.depenseDashboard = 0;
            }

            this.dashBoard = [
              {
                name: "Temps de rép Moyenne ",
                value: reparationMoyenne + ' heure(s)'
              },
              {
                name: "Total des dépenses ce mois",
                value: this.depenseDashboard + ' Ar'
              },
              {
                name: "Chiffre d'affaire ce mois ",
                value: this.caDashboard + ' Ar'
              },
              {
                name: "Bénéfice ce mois ",
                value: benefice + ' Ar'
              },
            ];
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)

          });
        });
      });
    });

  }

  getDataCA() {
    this.chiffreAffaire = 0;
    this.chiffreAffaireMois = 0;
    // this.spinner.hide();
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
    console.log(this.formMois.get('mois')?.value);
    const mois = this.formMois.get('mois')?.value-1;
    this.serviceFacture.getCAMois(mois+'').subscribe(response => {
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

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
  view: [number, number] = [900, 200];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  cardColor: string = '#3d4662';

  ngOnInit() {
    this.getDataMean();
  }

  constructor(
    private serviceReparation: ReparationService,
    private serviceDepense: DepenseService
  ) {
  }

  getDataMean() {
    this.serviceReparation.getMontantMoyenne().subscribe(montantMoyenne => {
      this.serviceDepense.getTotalMois().subscribe(totalDepenseMois => {
        this.reparationMoyenne = [
          {
            name: "Temps de réparation Moyenne effectué ",
            value: montantMoyenne + ' heure(s)'
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


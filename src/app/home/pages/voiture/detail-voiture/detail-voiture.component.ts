import {Component, OnInit} from '@angular/core';
import {Voiture} from "../../../../@core/models/voiture.model";
import {ActivatedRoute} from "@angular/router";
import {VoitureService} from "../../../../@core/services/voiture.service";
import {Reparation} from "../../../../@core/models/reparation.model";
import {SousreparationService} from "../../../../@core/services/sousreparation.service";
import {SousReparation} from "../../../../@core/models/sousReparation.model";
import {ReparationService} from "../../../../@core/services/reparation.service";

@Component({
  selector: 'app-detail-voiture',
  templateUrl: './detail-voiture.component.html',
  styleUrls: ['./detail-voiture.component.scss']
})
export class DetailVoitureComponent implements OnInit {
  voitures: Voiture[] | undefined;
  voiture: Voiture | undefined;
  reparation: Reparation | undefined;
  sousreparations: SousReparation [] | undefined;

  constructor(
    private route: ActivatedRoute,
    private service: VoitureService,
    private serviceSousReparation: SousreparationService,
    private serviceReparation: ReparationService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const reparationId: string | null = this.route.snapshot.paramMap.get('id');
    if (reparationId) {
      this.serviceSousReparation.getSousReparations(reparationId).subscribe(response => {
        this.sousreparations = response;
      });
      this.serviceReparation.getReparation(reparationId).subscribe(response => {
        this.reparation = response;
      })
    }
  }

}

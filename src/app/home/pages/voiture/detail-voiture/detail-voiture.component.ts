import {Component, OnInit} from '@angular/core';
import {Voiture} from "../../../../@core/models/voiture.model";
import {ELEMENT_DATA} from "../list-voiture/list-voiture.component";
import {ActivatedRoute} from "@angular/router";
import {VoitureService} from "../../../../@core/services/voiture.service";

@Component({
  selector: 'app-detail-voiture',
  templateUrl: './detail-voiture.component.html',
  styleUrls: ['./detail-voiture.component.scss']
})
export class DetailVoitureComponent implements OnInit {
  voitures: Voiture[] | undefined;
  voiture: Voiture | undefined;

  constructor(
    private route: ActivatedRoute,
    private service : VoitureService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    const vehiclesId: string | null = this.route.snapshot.paramMap.get('id');
    this.service.getVoitures().subscribe(response => {
      this.voitures = response;
      this.voiture =  this.voitures?.find((voiture)=>voiture._id == vehiclesId);
      console.log(this.voiture?.marque);
    })
  }

}

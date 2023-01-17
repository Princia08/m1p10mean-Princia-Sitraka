import {Component, OnInit} from '@angular/core';
import {Voiture} from "../../../../@core/models/voiture.model";
import {ELEMENT_DATA} from "../list-voiture/list-voiture.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-detail-voiture',
  templateUrl: './detail-voiture.component.html',
  styleUrls: ['./detail-voiture.component.scss']
})
export class DetailVoitureComponent implements OnInit {
  // vehicules: Voiture [];
  vehicule: Voiture | undefined;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // this.vehicules = ELEMENT_DATA;
    const vehiculeId: string | null = this.route.snapshot.paramMap.get('id');
    // this.vehicule = this.vehicules.find((vehicule) => vehicule._id == vehiculeId);
  }

}

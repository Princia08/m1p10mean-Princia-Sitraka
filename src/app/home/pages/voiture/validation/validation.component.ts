import {Component, OnInit} from '@angular/core';
import {DepotService} from "../../../../@core/services/depot.service";
import {Depot} from "../../../../@core/models/depot.model";
import {Voiture} from "../../../../@core/models/voiture.model";

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {
  depots: Depot[] | undefined;

  constructor(
    private serviceDepot: DepotService
  ) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.serviceDepot.getDepots().subscribe(response => {
      this.depots = response;
    })
  }

  confirmDepot(depot: Depot) {
    this.serviceDepot.updateDepot(depot._id).subscribe(response => {
      this.getData();
      console.log("update");
    });
  }
  verifyVoiture(depot:Depot){
    // verifier client et voiture
    if(depot.voiture._id){}
  }
}

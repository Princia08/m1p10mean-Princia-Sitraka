import {Component, OnInit} from '@angular/core';
import {DepotService} from "../../../../@core/services/depot.service";
import {Depot} from "../../../../@core/models/depot.model";
import {ReparationService} from "../../../../@core/services/reparation.service";
import {Reparation} from "../../../../@core/models/reparation.model";
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../../../../@core/services/dialog/dialog.service";
import {ConfirmDialogComponent} from "../../../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {
  depots: Depot[] | undefined;
  reparation: Reparation | undefined;

  form = new FormGroup({
    voiture: new FormControl('')
  })

  constructor(
    private serviceDepot: DepotService,
    private serviceReparation: ReparationService,
    private dialogService : DialogService,
    private dialog : MatDialog
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
    this.openConfirmDialog();
    // this.form.get('voiture')?.setValue(depot.voiture._id);
    // this.serviceReparation.create(this.form.value).subscribe(response => {
    //   this.getData();
    //   console.log("insert here");
    //   this.serviceDepot.updateDepot(depot._id).subscribe(response => {
    //   });
    // });
  }
  openConfirmDialog(){
  const options = {
    title: "Voulez vous vraiment confirmer le vehicule ? ",
    cancelText : " Oui , Confirmer",
    confirmText : "Non, Annuler",
    width : '100px',
  }
    this.dialog.open(ConfirmDialogComponent);
  }
  verifyVoiture(depot: Depot) {
    // verifier client et voiture
    if (depot.voiture._id) {
    }
  }
}

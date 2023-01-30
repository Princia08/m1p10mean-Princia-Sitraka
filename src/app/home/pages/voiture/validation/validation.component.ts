import {Component, OnInit} from '@angular/core';
import {DepotService} from "../../../../@core/services/depot.service";
import {Depot} from "../../../../@core/models/depot.model";
import {ReparationService} from "../../../../@core/services/reparation.service";
import {Reparation} from "../../../../@core/models/reparation.model";
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../../../../@core/services/dialog/dialog.service";
import {ConfirmDialogComponent} from "../../../confirm-dialog/confirm-dialog.component";
import {PersonneService} from "../../../../@core/services/personne.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {
  depots: Depot[] | undefined;
  reparation: Reparation | undefined;
  dialogIsOpen = false;

  form = new FormGroup({
    voiture: new FormControl(''),
    idClient: new FormControl('')
  })

  constructor(
    private serviceDepot: DepotService,
    private serviceReparation: ReparationService,
    private dialogService: DialogService,
    private dialog: MatDialog,
    private servicePersonne : PersonneService,
    private spinner : NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.spinner.show()
    this.getData()
  }
  withBlur() {
    this.dialogIsOpen = true;
  }
  noBlur() {
    this.dialogIsOpen = false;
  }
  getData() {
    this.serviceDepot.getDepots().subscribe(response => {
      this.depots = response;
      setTimeout(() => {
        this.spinner.hide();
      }, 500)
    })
  }

  confirmDepot(depot: Depot) {
    this.openConfirmDialog(depot);
    // this.form.get('voiture')?.setValue(depot.voiture._id);
    // this.serviceReparation.create(this.form.value).subscribe(response => {
    //   this.getData();
    //   console.log("insert here");
    //   this.serviceDepot.updateDepot(depot._id).subscribe(response => {
    //   });
    // });
  }

  openConfirmDialog(depot: Depot) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Voulez vous vraiment confirmer le vehicule ? ",
        confirmText: " Oui , Confirmer",
        cancelText: "Non, Annuler",
      },
      width: '300px',
    });
    this.withBlur();

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.form.get('voiture')?.setValue(depot.voiture._id);
        this.form.get('idClient')?.setValue(depot.voiture.idClient._id);
        this.serviceReparation.create(this.form.value).subscribe(response => {
          this.serviceDepot.updateDepot(depot._id).subscribe(response => {
            this.getData();
          });
        });
      }
      this.noBlur();
    })
  }

  verifyVoiture(depot: Depot) {
    // verifier client et voiture
    if (depot.voiture._id) {
    }
  }
}

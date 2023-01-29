import {Component, OnInit} from '@angular/core';
import {Voiture} from "../../../../@core/models/voiture.model";
import {ActivatedRoute} from "@angular/router";
import {VoitureService} from "../../../../@core/services/voiture.service";
import {Reparation} from "../../../../@core/models/reparation.model";
import {SousreparationService} from "../../../../@core/services/sousreparation.service";
import {SousReparation} from "../../../../@core/models/sousReparation.model";
import {ReparationService} from "../../../../@core/services/reparation.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../confirm-dialog/confirm-dialog.component";
import {BonSortieService} from "../../../../@core/services/bon-sortie.service";
import {PdfDialogComponent} from "../../../pdf-dialog/pdf-dialog.component";
import {SousreparationEditDialogComponent} from "../sousreparation-edit-dialog/sousreparation-edit-dialog.component";
import {environment} from "../../../../../environments/environment";
import {DomSanitizer} from "@angular/platform-browser";
import {BonSortie} from "../../../../@core/models/bonSortie.model";


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
  date: Date = new Date();
  dateNow = this.date.getDay() + "/" + this.date.getMonth() + 1 + "/" + this.date.getFullYear();
  dialogIsOpen = false;
  bonSortie: BonSortie | undefined;

  constructor(
    private route: ActivatedRoute,
    private service: VoitureService,
    private serviceSousReparation: SousreparationService,
    private serviceReparation: ReparationService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private serviceBonSortie: BonSortieService,
    private sanitizer: DomSanitizer
  ) {
  }

  form = new FormGroup({
    motif: new FormControl('', Validators.required),
    montant: new FormControl('', Validators.required),
    reparation: new FormControl('')
  })

  ngOnInit(): void {
    this.getData();
  }

  withBlur() {
    this.dialogIsOpen = true;
  }

  noBlur() {
    this.dialogIsOpen = false;
  }

  getData() {
    const reparationId: string | null = this.route.snapshot.paramMap.get('id');
    // this.updateReparation(reparationId);
    if (reparationId) {
      this.serviceBonSortie.getPdfPath(reparationId).subscribe(response => {
        this.serviceSousReparation.getSousReparations(reparationId).subscribe(response => {
          this.sousreparations = response;
        });
      });
      this.serviceBonSortie.getBonSortie(reparationId).subscribe(response => {
        this.bonSortie = response;
      });
      this.serviceReparation.getReparation(reparationId).subscribe(response => {
        this.reparation = response;
      });
      this.serviceReparation.getAllSousRep(reparationId).subscribe(response => {
        console.log("all sous reparation : " + response.sousReparations);
      })
    }
  }

  updateReparation(reparation: any) {
    this.serviceSousReparation.getSousReparations(reparation).subscribe(sousreparations => {
      const statusGeneral = sousreparations.every((sousrep: { status: string; }) => sousrep.status === 'terminée');
      console.log('statusGeneral : ' + statusGeneral);
      if (statusGeneral) {
        this.serviceReparation.updateTrue(reparation).subscribe(response => {
          this.getData();
        });
      } else {
        this.serviceReparation.updateFalse(reparation).subscribe(response => {
          this.getData();
        });
      }
    });
  }

  addSousReparation(reparation: any) {
    const idRep = reparation._id;
    this.form.get('reparation')?.setValue(reparation._id);
    console.log(this.form.value);
    if (idRep) {
      this.serviceSousReparation.create(this.form.value).subscribe(response => {
        this.form.reset();
        this.updateReparation(reparation._id);
        this.getData();
      })
    }
  }

  setStatus(sp: SousReparation) {
    const reparationId: string | null = this.route.snapshot.paramMap.get('id');
    const dialogRef = this.dialog.open(SousreparationEditDialogComponent, {
      data: {
        title: "Voulez-vous finir cette réparation ? ",
        confirmText: "Confirmer",
        cancelText: "Annuler",
      },
      width: '280px'
    });
    this.withBlur();
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.serviceSousReparation.update(sp._id).subscribe(response => {
          console.log("mandalo ato am update");
          this.updateReparation(reparationId);
          this.getData();
        })
      } else {
      }
      this.noBlur();
    });

  }

  deleteSousReparation(sp: SousReparation) {
    const reparationId: string | null = this.route.snapshot.paramMap.get('id');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Voulez vous annuler cette réparation ? ",
        confirmText: " Oui , Annuler ",
        cancelText: "Non, Garder",
      },
      width: '325px',
    });
    this.withBlur();

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.serviceSousReparation.delete(sp._id).subscribe(response => {
          this.updateReparation(reparationId);
          this.getData();
        });
      } else {

      }
      this.noBlur();
    });
  }


  viewBonSortie(reparation: any) {
    const id = reparation._id;

    this.serviceBonSortie.getPdfPath(id).subscribe(file => {
      const sourcefile = environment.directory + '/' + file;
      const dialogRef = this.dialog.open(PdfDialogComponent, {
        data: {
          confirmText: "Valider Bon de Sortie",
          cancelText: "Fermer",
          source: sourcefile,
          reparation: reparation
        },
        width: '50%',
        height: '90%'
      });
      this.withBlur();
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.getData();
        } else {
        }
        this.noBlur();
      })
    });
  }


}

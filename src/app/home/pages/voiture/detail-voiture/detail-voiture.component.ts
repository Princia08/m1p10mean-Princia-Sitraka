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
  pdfSrc: string = '';

  constructor(
    private route: ActivatedRoute,
    private service: VoitureService,
    private serviceSousReparation: SousreparationService,
    private serviceReparation: ReparationService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private serviceBonSortie: BonSortieService,
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
    if (reparationId) {
      this.serviceSousReparation.getSousReparations(reparationId).subscribe(response => {
        this.sousreparations = response;
      });
      this.serviceReparation.getReparation(reparationId).subscribe(response => {
        this.reparation = response;
      })
    }
  }

  addSousReparation(reparation: any) {
    const idRep = reparation._id;
    this.form.get('reparation')?.setValue(reparation._id);
    console.log(this.form.value);
    if (idRep) {
      this.serviceSousReparation.create(this.form.value).subscribe(response => {
        this.form.reset();
        this.getData();
      })
    }
  }

  setStatus() {
    const dialogRef = this.dialog.open(SousreparationEditDialogComponent, {
      data: {
        title: "Modification sous reparation : ",
        confirmText: "Confirmer",
        cancelText: "Annuler",
      },
      width:'300px'
    });
    this.withBlur();
    dialogRef.afterClosed().subscribe(res => {
      if (res) {

      } else {
      }
      this.noBlur();
    })
  }

  deleteSousReparation(sp: SousReparation) {
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
          this.getData();
        });
      } else {
        console.log("okzao ka")
      }
      this.noBlur();
    });
  }

  updateAvacementReparation() {
    // @ts-ignore
    // for(let sousrep of this.sousreparations){
    //   if(sousrep.status!="termine"){
    //
    //   }else{
    //
    //   }
    // }
  }

  viewBonSortie(reparation: any) {
    const id = reparation._id;
    console.log("id :" + id)
    const filePath = this.serviceBonSortie.getPdfPath(id).subscribe(response => {
      console.log(response);
    });
    const dialogRef = this.dialog.open(PdfDialogComponent, {
      data: {
        confirmText: "Valider Bon de Sortie",
        cancelText: "Fermer",
        pdf: ""
      },
      width: '50%',
      height: '800px'
    });
    this.withBlur();
    dialogRef.afterClosed().subscribe(res => {
      if (res) {

      } else {
      }
      this.noBlur();
    })
  }


  confirmBonSortie(reparation: Reparation) {
    this.serviceBonSortie.update(reparation._id).subscribe(response => {

    })
    // envoi mail vers le client
    // update bonsortie to valide
  }


}

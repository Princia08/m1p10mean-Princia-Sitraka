import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {BonSortieService} from "../../@core/services/bon-sortie.service";
import {BonSortie} from "../../@core/models/bonSortie.model";


@Component({
  selector: 'app-pdf-dialog',
  templateUrl: './pdf-dialog.component.html',
  styleUrls: ['./pdf-dialog.component.scss']
})
export class PdfDialogComponent implements OnInit {

  dialogIsOpen = false;
  sourcePdf!: SafeResourceUrl;
  bonSortie: BonSortie | undefined;

  constructor(
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<PdfDialogComponent>,
    private bonSortieService: BonSortieService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.sourcePdf = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.source);
    this.getData();
  }

  getData() {
    this.bonSortieService.getBonSortie(this.data.reparation._id).subscribe(response => {
      this.bonSortie = response;
    });
  }

  pdfUrl() {
  }

  onclickNo(): void {
    this.dialogRef.close(false);
  }

  onclickYes(): void {
    this.dialogRef.close(true);
    this.confirmBonSortie();
  }

  confirmBonSortie() {
    this.bonSortieService.update(this.data.reparation._id).subscribe(response => {
      this.bonSortie = response;
    });
    // console.log(bonSortieUpdated);
    //update bon de sortie
    //envoi mail vers le client
    //rendre le bouton valider indisponible

  }
}

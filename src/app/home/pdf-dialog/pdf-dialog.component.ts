import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {BonSortieService} from "../../@core/services/bon-sortie.service";
import {BonSortie} from "../../@core/models/bonSortie.model";
import {PersonneService} from "../../@core/services/personne.service";
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import Swal from 'sweetalert2';


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
    private servicePersonne: PersonneService,
    private http: HttpClient,
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
    this.createFacture();
  }

  createFacture() {
    console.log(this.data);
    this.http.post(`${environment.BASE}/facture`, {
      idReparation: this.data.reparation._id,
      idClient: this.data.reparation.idClient
    }).subscribe({
      next: () => Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Facture créée avec succès',
        showConfirmButton: false,
        timer: 1500
      }),
      error: err => {
        alert(err)
      }
    })
  }

  confirmBonSortie() {
    this.bonSortieService.update(this.data.reparation._id).subscribe(response => {
      this.bonSortie = response;
    });
    this.servicePersonne.sendMail(this.data.mail).subscribe();

  }
}

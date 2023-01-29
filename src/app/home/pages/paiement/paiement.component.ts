import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent implements OnInit {

  constructor(private http: HttpClient) { }
  factureList!: any[];
  montantList!: any[];

  ngOnInit(): void {
    this.loadFactureUnpaid();
  }

  loadFactureUnpaid() {
    this.http.get(`${environment.BASE}/facture/unpaid`).subscribe({
      next: (res: any) => {this.factureList = res[0], this.montantList = res[1]},
      error: err => alert(err)
    })
  }

  payer(facture: any) {
    this.http.get(`${environment.BASE}/facture/update/${facture._id}`).subscribe({
      next: () => {
        Swal.fire({
          text: `Facture n ${facture._id} payée`, icon: 'success',
          showConfirmButton: false,
          timer: 1500
        }),
        this.loadFactureUnpaid();
      },
      error: err => alert(err)
    })
  }

}

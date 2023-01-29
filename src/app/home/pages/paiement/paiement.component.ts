import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent implements OnInit {

  constructor(private http: HttpClient) { }
  factureList!: any[];

  ngOnInit(): void {
    this.loadFactureUnpaid();
  }

  loadFactureUnpaid() {
    this.http.get(`${environment.BASE}/unpaid`).subscribe({
      next: (res:any) => this.factureList = res,
      error: err => alert(err)
    })
  }

  payer(facture: any) {

  }

}

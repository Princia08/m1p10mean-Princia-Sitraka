import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/token/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {
  voitureList!: any[];
  reparationList: any[] = [];
  montantList: any[] = [];
  voiture: any;
  
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.loadAllVoitureClient();
  }

  public loadAllVoitureClient() {
    this.http.get(`${environment.BASE}/voiture/${this.tokenService.getUserByToken()._id}`).subscribe({
      next: (res:any) => this.voitureList = res,
      error: err => alert(err)
    })
  }

  public loadReparationByVoiture(voiture: any) {
    this.voiture = voiture;
    this.http.get(`${environment.BASE}/reparation/idVoiture/${voiture._id}`).subscribe({
      next: (res:any) => {this.reparationList = res[0], this.montantList = res[1]},
      error: err => alert(err)
    })
  }

}

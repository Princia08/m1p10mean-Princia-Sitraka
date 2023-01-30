import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/token/token.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {
  voitureList!: any[];
  reparationList: any[] = [];
  sousReparationList: any[] = [];
  montantList: any[] = [];
  voiture: any;
  displayStyle = "none";

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private spinner : NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.loadAllVoitureClient();
  }

  public loadAllVoitureClient() {
    this.http.get(`${environment.BASE}/voiture/${this.tokenService.getUserByToken()._id}`).subscribe({
      next: (res:any) => this.voitureList = res,
      error: err => alert(err)
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  public loadReparationByVoiture(voiture: any) {
    this.voiture = voiture;
    this.http.get(`${environment.BASE}/reparation/idVoiture/${voiture._id}`).subscribe({
      next: (res:any) => {this.reparationList = res[0], this.montantList = res[1]},
      error: err => alert(err)
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  public loadSousReparation(reparation: any) {
    this.displayStyle = "block";
    this.http.get(`${environment.BASE}/sousReparation/sp/${reparation._id}`).subscribe({
      next: (res: any) => {
        this.sousReparationList = res
        if (res.length == 0) Swal.fire({ icon: 'error', title: 'Désolé...', text: 'Vous n\'avez pas encore de réparation' })
      },
      error: err => alert(err)
    })
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  public closePopup() {
    this.displayStyle= "none";
  }

}

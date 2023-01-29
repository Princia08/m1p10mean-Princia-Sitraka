import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/token/token.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reparation',
  templateUrl: './reparation.component.html',
  styleUrls: ['./reparation.component.scss']
})
export class ReparationComponent implements OnInit {
  reparationList: any[] = [];
  sousReparationList: any[] = [];
  reparation: any;

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.loadAllReparationClient();
  }

  public loadAllReparationClient() {
    this.http.get(`${environment.BASE}/reparation/idClient/${this.tokenService.getUserByToken()._id}`).subscribe({
      next: (res: any) => {
        this.reparationList = res
      },
      error: err => alert(err)
    })
  }

  public loadSousReparation(reparation: any) {
    this.reparation = reparation;
    this.http.get(`${environment.BASE}/sousReparation/sp/${reparation._id}`).subscribe({
      next: (res: any) => {
        this.sousReparationList = res
        if (res.length == 0) Swal.fire({ icon: 'error', title: 'Désolé...', text: 'Vous n\'avez pas encore de réparation' })
      },
      error: err => alert(err)
    })
  }

  // public setAvancement() {
  //   for(let sousReparation of this.sousReparationList) {
  //       if(sousReparation.status == "en cours") {
  //          this.avancement = "en cours"; 
  //       }
  //   }
  // }
}

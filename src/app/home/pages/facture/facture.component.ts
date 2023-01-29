import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/token/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {
  factureList!: any[];
  constructor(private http:HttpClient, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.loadFactureByClient(); 
  }

  public loadFactureByClient() {
    this.http.get(`${environment.BASE}/facture/idClient/${this.tokenService.getUserByToken()._id}`).subscribe({
      next: (res:any) => { this.factureList = res },
      error: err => alert(err)
    })
  }  
}

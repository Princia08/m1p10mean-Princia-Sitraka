import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TokenService } from 'src/app/token/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {
  factureList!: any[];
  pdfPath!: SafeResourceUrl;
  displayStyle!: string;

  constructor(
    private http:HttpClient, 
    private tokenService: TokenService, 
    private sanitizer: DomSanitizer
  ) 
  {}

  ngOnInit(): void {    
    this.loadFactureByClient(); 
  }

  public loadFactureByClient() {
    this.http.get(`${environment.BASE}/facture/idClient/${this.tokenService.getUserByToken()._id}`).subscribe({
      next: (res:any) => { this.factureList = res },
      error: err => alert(err)
    })
  }  

  public loadPdf(idFacture: any) {
    this.http.get(`${environment.BASE}/facture/pdf/${idFacture}`).subscribe(file => {
      this.pdfPath = this.sanitizer.bypassSecurityTrustResourceUrl(environment.directory + '/' + file);
    })
  }

  public openPopup(idFacture: any) {
    this.displayStyle="block";
    this.loadPdf(idFacture);
  }
  public closePopup() {
    this.displayStyle="none";
    this.loadFactureByClient(); 
    this.pdfPath = ""
  }
}

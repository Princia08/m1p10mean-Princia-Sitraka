import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  private apiEndPint = `${environment.BASE}/facture`;

  constructor(private http: HttpClient) {
  }

  getCA(body:any): Observable<any> {
    return this.http.post<any>(`${this.apiEndPint}/chiffreAffaire`, body);
  }
  getCAMois(mois:string): Observable<any> {
    return this.http.get<any>(`${this.apiEndPint}/chiffreAffaireMois/${mois}`);
  }

}

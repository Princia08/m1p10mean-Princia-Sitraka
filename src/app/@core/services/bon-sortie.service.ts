import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BonSortieService {

  private apiEndPint = `${environment.BASE}/bonSortie`;
  private directoryEndPoint = `${environment.BASE}`;

  constructor(private http: HttpClient) {
  }
  getBonSortie(id:string): Observable<any> {
    return this.http.get<any>(`${this.apiEndPint}/bs/${id}`);
  }
  getPdfPath(id:string): Observable<any> {
    return this.http.get<any>(`${this.apiEndPint}/bsPdf/${id}`);
  }
  update(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiEndPint}/u/${id}`);
  }

}

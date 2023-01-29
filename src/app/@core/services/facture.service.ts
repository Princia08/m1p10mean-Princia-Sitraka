import { Injectable } from '@angular/core';
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

  getCA(): Observable<any> {
    return this.http.get<any>(`${this.apiEndPint}/chiffreAffaire`);
  }

}

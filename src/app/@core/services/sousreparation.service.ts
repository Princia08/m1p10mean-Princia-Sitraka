import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SousReparation} from "../models/sousReparation.model";

@Injectable({
  providedIn: 'root'
})
export class SousreparationService {
  private apiEndPint = `${environment.BASE}/sousReparation`;

  constructor(private http: HttpClient) {
  }

  getSousReparations(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiEndPint}/sp/${id}`);
  }
  create(sp: SousReparation): Observable<any> {
    return this.http.post(`${this.apiEndPint}/create`, sp);
  }
}

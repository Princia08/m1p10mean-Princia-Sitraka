import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReparationService {

  private apiEndPint = `${environment.BASE}/reparation`;

  constructor(private http: HttpClient) {
  }

  getReparations(): Observable<any> {
    return this.http.get<any>(`${this.apiEndPint}/reparations`);
  }

  getReparation(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiEndPint}/rep/${id}`);
  }

  create(sp: any): Observable<any> {
    return this.http.post(`${this.apiEndPint}/create`, sp);
  }

  updateTrue(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiEndPint}/ut/${id}`);
  }
  updateFalse(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiEndPint}/uf/${id}`);
  }
  getTempsReparationMoyenne(): Observable<any> {
    return this.http.get<any>(`${this.apiEndPint}/timeMean`);
  }

  getAllSousRep(idReparation: string): Observable<any> {
    return this.http.get<any>(`${this.apiEndPint}/allSousreparatioin/${idReparation}`);
  }
}

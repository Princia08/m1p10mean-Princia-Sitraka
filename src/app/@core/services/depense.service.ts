import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DepenseService {

  private apiEndPint = `${environment.BASE}/depense`;

  constructor(private http: HttpClient) {
  }

  create(sp: any): Observable<any> {
    return this.http.post(`${this.apiEndPint}/create`, sp);
  }

  getDepenses(): Observable<any> {
    return this.http.get<any>(`${this.apiEndPint}/depenses`);
  }
  getTotalMois(mois:string): Observable<any> {
    return this.http.get<any>(`${this.apiEndPint}/totalDep/${mois}`);
  }

}

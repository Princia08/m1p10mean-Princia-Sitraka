import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DepotService {
  private apiEndPint = `${environment.BASE}/depot`;

  constructor(private http: HttpClient) {
  }

  getDepots(): Observable<any> {
    return this.http.get<any>(`${this.apiEndPint}/depots`);
  }
  updateDepot(id:string): Observable<any> {
    return this.http.get<any>(`${this.apiEndPint}/update/${id}`);
  }
}

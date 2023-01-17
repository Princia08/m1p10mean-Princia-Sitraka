import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class VoitureService {
  private apiEndPint = `${environment.BASE}/voiture`;

  constructor(private http: HttpClient) {
  }

  getVoitures(): Observable<any> {
    return this.http.get<any>(`${this.apiEndPint}/voitures`);
  }
}

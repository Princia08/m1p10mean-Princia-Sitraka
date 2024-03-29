import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public getUserByToken() {
     const token = localStorage.getItem('token');
     const base64Url = token?.split('.')[1];
     return JSON.parse(window.atob(base64Url || ''))._doc;
  }
}

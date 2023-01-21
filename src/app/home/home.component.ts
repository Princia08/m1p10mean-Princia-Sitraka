import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  menuItems !: any[];
  nom !: string;
  constructor(private tokenService : TokenService) { }

  ngOnInit(): void {
    this.setItems();
    this.nom = this.tokenService.getUserByToken().nom;
  }

  setItems() {
    if(this.tokenService.getUserByToken().role == 'repsonsable_atelier') {
      this.menuItems = [
        { path: '/home/vehicule', title: 'Véhicule', icon: 'fas fa-warehouse' },
        { path: '/home/validation', title: 'Validation', icon: 'fas fa-hourglass-half' }
      ]
    }
    else if(this.tokenService.getUserByToken().role == 'client') {
      this.menuItems = [
        { path: '/home/depot', title: 'Dépôt', icon: 'fas fa-warehouse' }
      ]
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {TokenService} from '../token/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  menuItems !: any[];
  nom !: string;

  constructor(private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.setItems();
    this.nom = this.tokenService.getUserByToken().nom;
  }

  setItems() {
    if (this.tokenService.getUserByToken().role == 'responsable_atelier') {
      this.menuItems = [
        {path: '/home/vehicule', title: 'Véhicules', icon: 'fas fa-car'},
        {path: '/home/validation', title: 'Validation', icon: 'fas fa-hourglass-half'}
      ]
    } else if (this.tokenService.getUserByToken().role == 'client') {
      this.menuItems = [
        {path: '/home/depot', title: 'Dépôt', icon: 'fas fa-warehouse'}
      ]
    } else if (this.tokenService.getUserByToken().role == 'responsable-financier') {
      this.menuItems = [
        {path: '/home/stat', title: 'Statistiques', icon: 'fas fa-car'},
        {path: '/home/depenses', title: 'Dépenses', icon: 'fas fa-hourglass-half'}
      ]
    }
  }
}

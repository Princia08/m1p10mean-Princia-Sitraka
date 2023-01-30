import {Component, OnInit} from '@angular/core';
import { LogoutService } from '../security/logout/logout.service';
import { TokenService } from '../token/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  menuItems !: any[];
  nom !: string;

  constructor(private tokenService: TokenService, private logoutService: LogoutService) {
  }

  ngOnInit(): void {
    this.setItems();
    this.nom = this.tokenService.getUserByToken().nom;
  }

  setItems() {
    if (this.tokenService.getUserByToken().role == 'responsable_atelier') {
      this.menuItems = [
        {path: '/home/vehicule', title: 'Véhicule', icon: 'fas fa-car'},
        {path: '/home/validation', title: 'Validation', icon: 'fas fa-hourglass-half'}
      ]
    } else if (this.tokenService.getUserByToken().role == 'client') {
      this.menuItems = [
        {path: '/home/depot', title: 'Dépôt', icon: 'fas fa-warehouse'},
        {path: '/home/reparation', title: 'Réparation', icon: 'fa fa-wrench'},
        {path: '/home/facture', title: 'Facture', icon: 'fa fa-file-invoice'},
        {path: '/home/historique', title: 'Historique', icon: 'fa-solid fa-clock-rotate-left'}
      ]
    } else if (this.tokenService.getUserByToken().role == 'responsable_financier') {
      this.menuItems = [
        {path: '/home/stat', title: 'Statistiques', icon: 'fa fa-tachometer'},
        {path: '/home/depenses', title: 'Dépenses', icon: 'fa fa-credit-card'},
        {path: '/home/paiement', title: 'Paiement', icon: 'fa fa-solid fa-cash-register'}
      ]
    }
  }

  logout() { this.logoutService.logout(); }

}

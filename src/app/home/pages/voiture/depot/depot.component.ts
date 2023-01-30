import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/token/token.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.scss']
})
export class DepotComponent implements OnInit {
  voitureList: any[] = [];
  displayStyle = 'none';
  voiture!: any;
  description!: string;
  errorMessage!: string;
  errorFormMsg!: string;
  items = ['Carrots',  'Avocados'];

  basket = ['Oranges', 'Bananas', 'Cucumbers'];


  public form = new FormGroup({
    matricule: new FormControl('', [Validators.required]),
    marque: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  })

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.loadAllVoitureClient();
  }

  public createDepot(idVoiture: any, description: string) {
    this.http.post(`${environment.BASE}/depot`, {
      voiture: idVoiture,
      description: description
    }).subscribe({
      next: () => Swal.fire("Dépot effectué avec succès"),
      error: err => alert(err)
    });
    this.form.reset();
  }

  public createVehicule() {
    if (this.form.valid) {
      let data = this.form.value;
      this.http.post(`${environment.BASE}/voiture`, {
        idClient: this.tokenService.getUserByToken()._id,
        matricule: data.matricule,
        marque: data.marque,
        model: data.model,
        dans_garage: true
      }
      ).subscribe({
        next: (res: any) => {
          this.createDepot(res._id, data.description),
          this.loadAllVoitureClient()
        },
        error: (err) => alert('error')
      })
    }
    else this.errorFormMsg = "Veuillez remplir tous les champs";
  }

  public loadAllVoitureClient() {
    this.http.get(`${environment.BASE}/voiture/${this.tokenService.getUserByToken()._id}`).subscribe({
      next: (res:any) => this.voitureList = res,
      error: err => alert(err)
    })
  }
  public openPopup(voiture: any) {
    this.voiture = voiture;
    this.displayStyle = 'block';
  }

  public closePopup() {
    this.displayStyle = 'none';
    this.description='';
  }

  public confirmerDepot(voiture:any) {
    if(this.description) {
      this.createDepot(voiture._id, this.description);
      this.closePopup();
    }
    else this.errorMessage = "Veuillez insérer une description";

  }

  dropVoiture(event: CdkDragDrop<string[]>,voiture : any){
    if (event.previousContainer === event.container) {
      // moveItemInArray(this.voitureList, voiture, event.currentIndex);
    } else {
      console.log(voiture);
      event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      this.openPopup(voiture);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}

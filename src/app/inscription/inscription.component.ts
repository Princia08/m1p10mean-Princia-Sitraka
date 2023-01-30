import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  errorMessage!: string;

  ngOnInit(): void {
  }

  public form = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required]),
    mot_de_passe: new FormControl('', [Validators.required]),
    adresse: new FormControl('')
  })

  constructor(private http: HttpClient, private router: Router){}

  public inscription(){
    if(this.form.valid){
      this.http.post(`${environment.BASE}/personne`, this.form.value)
      .subscribe({
        next: (res: any) =>  {
          this.router.navigateByUrl('/')
          Swal.fire({ text:`${ this.form.value.nom }, votre inscription a été effectuée avec succès`, icon:'success',         
          showConfirmButton: false,
          timer: 1500 })
        },
        error: (err: any) => this.errorMessage= err.error.message
      })
    }
  }

  public signUp() {
    this.router.navigateByUrl('/')
  }
}

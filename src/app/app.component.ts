import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public form = new FormGroup({
    mail: new FormControl('', [Validators.required]),
    mot_de_passe: new FormControl('', [Validators.required]),
  })

  constructor(private http: HttpClient){}
}

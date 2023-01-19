import {Component, OnInit} from '@angular/core';
import {Voiture} from "../../../../@core/models/voiture.model";
import {ActivatedRoute} from "@angular/router";
import {VoitureService} from "../../../../@core/services/voiture.service";
import {Reparation} from "../../../../@core/models/reparation.model";
import {SousreparationService} from "../../../../@core/services/sousreparation.service";
import {SousReparation} from "../../../../@core/models/sousReparation.model";
import {ReparationService} from "../../../../@core/services/reparation.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-detail-voiture',
  templateUrl: './detail-voiture.component.html',
  styleUrls: ['./detail-voiture.component.scss']
})
export class DetailVoitureComponent implements OnInit {
  voitures: Voiture[] | undefined;
  voiture: Voiture | undefined;
  reparation: Reparation | undefined;
  sousreparations: SousReparation [] | undefined;

  // modelForm = this.formBuilder.group({
  //   motif: ['', Validators.compose([Validators.required])],
  //   montant: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
  // });
  constructor(
    private route: ActivatedRoute,
    private service: VoitureService,
    private serviceSousReparation: SousreparationService,
    private serviceReparation: ReparationService,
    private formBuilder: FormBuilder,
  ) {
  }
  form = new FormGroup({
    motif: new FormControl('',Validators.required),
    montant:new FormControl('',Validators.required),
    reparation:new FormControl('')
  })

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const reparationId: string | null = this.route.snapshot.paramMap.get('id');
    if (reparationId) {
      this.serviceSousReparation.getSousReparations(reparationId).subscribe(response => {
        this.sousreparations = response;
      });
      this.serviceReparation.getReparation(reparationId).subscribe(response => {
        this.reparation = response;
      })
    }
  }
  addSousReparation(reparation : any){
    const idRep = reparation._id;
    this.form.get('reparation')?.setValue(reparation._id);
    console.log(this.form.value);
    if(idRep){
      this.serviceSousReparation.create(this.form.value).subscribe(response=>{
        this.form.reset();
          this.getData();
      })
    }
  }

}

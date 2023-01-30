import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DepenseService} from "../../../@core/services/depense.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.scss']
})
export class DepenseComponent implements OnInit {

  form = new FormGroup({
    description: new FormControl('', Validators.required),
    montant: new FormControl('', Validators.required),
  });
  depenses!: any[];

  constructor(
    private serviceDepense: DepenseService,
    private spinner : NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.getData();
    this.spinner.show();
  }

  getData() {
    this.serviceDepense.getDepenses().subscribe(response => {
      this.depenses = response;
      this.spinner.hide();
    })
  }

  addDepense() {
    this.serviceDepense.create(this.form.value).subscribe(response => {
      this.form.reset();
      this.getData();
    })
  }
}

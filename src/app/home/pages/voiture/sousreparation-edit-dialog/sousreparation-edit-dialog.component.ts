import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-sousreparation-edit-dialog',
  templateUrl: './sousreparation-edit-dialog.component.html',
  styleUrls: ['./sousreparation-edit-dialog.component.scss']
})
export class SousreparationEditDialogComponent implements OnInit {

  dialogIsOpen = false;

  constructor(
    public dialogRef: MatDialogRef<SousreparationEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
  }

  onclickNo(): void {
    this.dialogRef.close(false);
  }

  onclickYes(): void {
    this.dialogRef.close(true);
  }

}

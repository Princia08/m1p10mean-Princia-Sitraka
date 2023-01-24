import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-pdf-dialog',
  templateUrl: './pdf-dialog.component.html',
  styleUrls: ['./pdf-dialog.component.scss']
})
export class PdfDialogComponent implements OnInit {

  dialogIsOpen = false;
  sourcePdf: string = '';

  constructor(
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<PdfDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.sourcePdf = ' '+this.sanitizer.bypassSecurityTrustResourceUrl(this.data.source).toString();
    console.log('pdf : ' + this.sourcePdf);
  }
  pdfUrl(){}

  onclickNo(): void {
    this.dialogRef.close(false);
  }

  onclickYes(): void {
    this.dialogRef.close(true);
  }

}

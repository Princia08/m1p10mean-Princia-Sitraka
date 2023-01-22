import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../home/confirm-dialog/confirm-dialog.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  dialogRef : MatDialogRef<any> | undefined;

  constructor(private dialog: MatDialog) {
  }

  public open(options: any) {
    this.dialogRef=this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: options.title,
        cancelText: options.cancelText,
        confirmText: options.confirmText
      },
      width: options.width,
      disableClose: false,
    });
  }
  public close(){
    this.dialogRef?.afterClosed().subscribe(result =>{
      console.log("dialog result : "+result);
    })
    this.dialogRef?.close();
  }


}

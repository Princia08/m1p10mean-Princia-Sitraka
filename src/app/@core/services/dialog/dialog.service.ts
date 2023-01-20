import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../home/confirm-dialog/confirm-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {
  }

  public open(options: any) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: options.title,
        cancelText: options.cancelText,
        confirmText: options.confirmText
      },
      width: options.width,
      disableClose: false,
    });

  }
}

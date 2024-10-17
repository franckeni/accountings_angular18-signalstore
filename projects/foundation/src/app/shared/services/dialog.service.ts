import { inject, Injectable, Type } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Actions, DialogSizes } from '../utils/constants';
import { DialogOptions } from '../models/common';

@Injectable({
  providedIn: 'root'
})
export class DialogService<T> {
  dialog = inject(MatDialog);

  getDialog(component: Type<unknown>, item: T | undefined, options: DialogOptions): MatDialogRef<T, unknown> {
    const size: string = this.getSize(options.action!);

    return this.dialog.open(component, {
      id: options.id ?? '',
      data: {item: item, action: options.action!},
      height: size,
      width: size
    }) as MatDialogRef<T, unknown>
  }

  private getSize(action: Actions): string {
    let size = DialogSizes.Big;

    switch (action) {
      case Actions.Create:
      case Actions.Edit:
        size = DialogSizes.Big;
        break;
      case Actions.Delete:
        size = DialogSizes.ExtraSmall;
        break;
    }

    return size;
  }
}